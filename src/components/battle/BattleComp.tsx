import { useEffect, useState } from 'react'
import HamsterInfo from "../gallery/HamsterInfo";
import './battle-comp.css';
import { Hamster } from '../../types/hamster-interface';

const BattleComp = () => {

	const [randomHamster1, setRandomHamster1] = useState<Hamster | null>(null)
	const [randomHamster2, setRandomHamster2] = useState<Hamster | null>(null)

	useEffect(() => {
		async function getRandomHamster() {
			const response1 = await fetch('/hamsters/random', {method: 'GET'});
			const data1 = await response1.json();
			setRandomHamster1(data1);

			const response2 = await fetch('/hamsters/random', {method: 'GET'});
			const data2 = await response2.json();
			setRandomHamster2(data2);
		}
		getRandomHamster();
		
	}, [])

	async function voting(num:number) {
		alert("Röstat på: " + num);

		let winner:Hamster;
		let loser:Hamster;

		if (randomHamster1 !== null && randomHamster2 !== null) {
			if (num === 1) {
				winner = randomHamster1;
				loser = randomHamster2;
			}
			else {
				loser = randomHamster1;
				winner = randomHamster2;
			}	
			winner.wins++;
			winner.games++;
			loser.defeats++;
			loser.games++;

			fetch(`/hamsters/${winner.firestoreId}`, {method: 'PUT', headers: {
				'Content-type': 'application/json'}, body: JSON.stringify(winner)});
			fetch(`/hamsters/${loser.firestoreId}`, {method: 'PUT', headers: {
				'Content-type': 'application/json'}, body: JSON.stringify(loser)});
		}
	}

	return (
		<section className="battle-comp">
			<HamsterInfo buttonText={"RÖSTA"} hamster={randomHamster1} buttonFunction={() => voting(1)} />
			<div className="battle-comp-vs">VS</div>
			<HamsterInfo buttonText={"RÖSTA"} hamster={randomHamster2} buttonFunction={() => voting(2)}/>
		</section>
	);
}

export default BattleComp;
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

	async function voting(winner:Hamster | null, loser:Hamster | null) {

		if (winner && loser) {
			const winnerUpdate = {
				wins: winner.wins + 1,
				games: winner.games + 1
			}
			const loserUpdate = {
				defeats: loser.defeats + 1,
				games: loser.games + 1 
			}
			
			putHamster(winner.firestoreId, winnerUpdate);
			putHamster(loser.firestoreId, loserUpdate);
		}
	}

	async function putHamster(firestoreId:string, hamsterUpdate:any) {
		const putResponse = await fetch(`/hamsters/${firestoreId}`, {method: 'PUT', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify(hamsterUpdate)});
		const resData2 = await putResponse.json();
		console.log(resData2);
	}
	return (
		<section className="battle-comp">
			<HamsterInfo buttonText={"RÖSTA"} hamster={randomHamster1} buttonFunction={() => voting(randomHamster1, randomHamster2)} />
			<div className="battle-comp-vs">VS</div>
			<HamsterInfo buttonText={"RÖSTA"} hamster={randomHamster2} buttonFunction={() => voting(randomHamster2, randomHamster1)}/>
		</section>
	);
}

export default BattleComp;
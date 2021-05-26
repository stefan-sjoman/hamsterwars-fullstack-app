import { useEffect, useState } from 'react'
import HamsterInfo from "../gallery/HamsterInfo";
import ResultComp from './ResultComp';
import './battle-comp.css';
import { Hamster } from '../../types/hamster-interface';

const BattleComp = () => {

	const [randomHamster1, setRandomHamster1] = useState<Hamster | null>(null);
	const [randomHamster2, setRandomHamster2] = useState<Hamster | null>(null);
	const [hasVoted, setHasVoted] = useState(false);
	const [runUseEffect, setRunUseEffect] = useState(true);

	useEffect(() => {
		async function getRandomHamster(setHamster:(data:any) => void) {
			const response = await fetch('/hamsters/random', {method: 'GET'});
			const data = await response.json();
			setHamster(data);
			setHasVoted(false)
		}
		getRandomHamster(setRandomHamster1);
		getRandomHamster(setRandomHamster2);
		//TODO Kan bli samma hamster!!!
	}, [runUseEffect])

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
			setHasVoted(true);
		}
	}

	async function putHamster(firestoreId:string, hamsterUpdate:any) {
		const putResponse = await fetch(`/hamsters/${firestoreId}`, {method: 'PUT', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify(hamsterUpdate)});
		const putData = await putResponse.text();
		console.log(putData);
	}

	function voteOrvoted () {
		if (!hasVoted) {
			return (
				<section className="battle-section">
					<HamsterInfo buttonText={"RÖSTA"} hamster={randomHamster1} buttonFunction={() => voting(randomHamster1, randomHamster2)} />
					<div className="battle-comp-vs">VS</div>
					<HamsterInfo buttonText={"RÖSTA"} hamster={randomHamster2} buttonFunction={() => voting(randomHamster2, randomHamster1)}/>
				</section>
			)
		} else {
			return (
				<section className="after-battle">
					<ResultComp randomHamster1={randomHamster1} randomHamster2={randomHamster2}/>
					<button className="basic-btn" onClick={() =>setRunUseEffect(!runUseEffect)}>TÄVLA IGEN</button>
				</section>
			)
		}
	}
	const voteOrResult = voteOrvoted();

	return (
		<section className="battle-comp">
			{ voteOrResult }		
		</section>
	);
}

export default BattleComp;
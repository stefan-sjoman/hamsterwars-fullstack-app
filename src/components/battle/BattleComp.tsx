import { useEffect, useState } from 'react'
import HamsterInfo from "../gallery/HamsterInfo";
import HamsterCard from "../gallery/HamsterCard";
import './battle-comp.css';
import { Hamster } from '../../types/hamster-interface';

const BattleComp = () => {

	const [randomHamster1, setRandomHamster1] = useState<Hamster | null>(null);
	const [randomHamster2, setRandomHamster2] = useState<Hamster | null>(null);
	const [hasVoted, setHasVoted] = useState(false);

	useEffect(() => {
		async function getRandomHamster(setHamster:(data:any) => void) {
			const response = await fetch('/hamsters/random', {method: 'GET'});
			const data = await response.json();
			setHamster(data);
		}
		getRandomHamster(setRandomHamster1);
		getRandomHamster(setRandomHamster2);
		//TODO Kan bli samma hamster!!!
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
			setHasVoted(true);
		}
	}

	async function putHamster(firestoreId:string, hamsterUpdate:any) {
		const putResponse = await fetch(`/hamsters/${firestoreId}`, {method: 'PUT', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify(hamsterUpdate)});
		const resData2 = await putResponse.text();
		console.log(resData2);
	}
	return (
		<section className="battle-comp">
			{ !hasVoted?
				<section className="battle-section">
					<HamsterInfo buttonText={"RÖSTA"} hamster={randomHamster1} buttonFunction={() => voting(randomHamster1, randomHamster2)} />
					<div className="battle-comp-vs">VS</div>
					<HamsterInfo buttonText={"RÖSTA"} hamster={randomHamster2} buttonFunction={() => voting(randomHamster2, randomHamster1)}/>
				</section>
			:	
			<section className="after-battle">	
				<div>
					<HamsterCard hamster={randomHamster1}/>
					<div>
						<p>Vinster: {randomHamster1? randomHamster1.wins: ""}</p>	
						<p>Förluster: {randomHamster1? randomHamster1.defeats : ""}</p>	
					</div> 
				</div> 
				<div className="battle-comp-vs">VS</div>
				<div>
				<HamsterCard hamster={randomHamster2}/>
					<div>
						<p>Vinster: {randomHamster2? randomHamster2.wins: ""}</p>
						<p>Förluster: {randomHamster2? randomHamster2.defeats : ""}</p>
					</div>
				</div>
			</section>
			}		
		</section>
	);
}

export default BattleComp;
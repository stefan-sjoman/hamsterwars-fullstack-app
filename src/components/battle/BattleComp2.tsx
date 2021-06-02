import { useEffect, useState } from "react";
import { Hamster } from "../../types/hamster-interface";
import HamsterInfo from "../gallery/HamsterInfo";
import BattleResult from "./BattleResult";
import './battle-comp.css';


const BattleComp2 = () => {

	const [randomHamster1, setRandomHamster1] = useState<Hamster | null >(null);
	const [randomHamster2, setRandomHamster2] = useState<Hamster | null >(null);
	const [updatedWinner, setUpdatedWinner] = useState<any>(null)
	const [updatedLoser, setUpdatedLoser] = useState<any>(null)
	const [hasVoted, setHasVoted] = useState(false);
	const [runUseEffect, setRunUseEffect] = useState(true);

	useEffect(() => {
		async function getRandomHamster(setHamster:(data:any) => void) {
			const response = await fetch('/hamsters/random', {method: 'GET'});
			const data = await response.json();
			setHamster(data);
			setHasVoted(false);
		}

		getRandomHamster(setRandomHamster1);
		getRandomHamster(setRandomHamster2);

	}, [runUseEffect])

	async function voting(winner:Hamster, loser:Hamster) {

		if (winner && loser) {
			const winnerUpdate = {
				wins: winner.wins + 1,
				games: winner.games + 1
			}
			const loserUpdate = {
				defeats: loser.defeats + 1,
				games: loser.games + 1 
			}
			if (randomHamster1 && randomHamster2){
				let tempWinner:Hamster
				let tempLoser:Hamster
				if (randomHamster1.firestoreId === winner.firestoreId) {
					tempWinner = randomHamster1;
					tempLoser = randomHamster2;
				} else {
					tempWinner = randomHamster2;
					tempLoser = randomHamster1;
				}
				tempWinner.wins = winner.wins + 1;
				tempWinner.games = winner.games + 1;
				tempLoser.defeats = loser.defeats +1;
				tempLoser.games = loser.games + 1;
				
				setUpdatedWinner(tempWinner);
				setUpdatedLoser(tempLoser);	
				setRandomHamster1(null);
				setRandomHamster2(null);	
			}
			Promise.all([
				putHamster(winner.firestoreId, winnerUpdate),
				putHamster(loser.firestoreId, loserUpdate), 
				postMatch(winner.firestoreId, loser.firestoreId)
			]).then(() => {
				setHasVoted(true);
			});
		}
	}

	async function putHamster(firestoreId:string, hamsterUpdate:any) {
		const putResponse = await fetch(`/hamsters/${firestoreId}`, {method: 'PUT', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify(hamsterUpdate)});
		const putData = await putResponse.text();
		console.log(putData);
	}

	async function postMatch(winnerId:string, loserId:string) {
		const match = {winnerId: winnerId, loserId: loserId}
		const postMatchResponse = await fetch(`/matches`, {method: 'POST', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify(match)});
		const postMatchData = await postMatchResponse.text();
		console.log(postMatchData);
	}

	function voteOrResult () {
		if (!hasVoted) {
			if (randomHamster1 && randomHamster2) {
				return (
					<section className="battle-section">
						<div className="one-game">
							<HamsterInfo buttonText={"RÖSTA"} hamster={randomHamster1} buttonFunction={() => voting(randomHamster1, randomHamster2)} showDeleteAndDefeated={false} />
							<div className="vs-div">VS</div>
							<HamsterInfo buttonText={"RÖSTA"} hamster={randomHamster2} buttonFunction={() => voting(randomHamster2, randomHamster1)} showDeleteAndDefeated={false}/>
						</div>
					</section>
				)
			} else {
				return (
					<section className="battle-section">
						<div>Laddar hamstrar...</div>
					</section>
				)
			}
		} else {
			return (
				<BattleResult winner={updatedWinner} loser={updatedLoser} setRunUseEffect={setRunUseEffect} runUseEffect={runUseEffect} />
			)
		}
	}
	const content = voteOrResult();

	return (
		<section className="battle-comp basic-main">
			{ content }		
		</section>
	);
}

export default BattleComp2;
import { useEffect, useState } from "react";
import { Hamster } from "../../types/hamster-interface";
import HamsterInfo from "../gallery/HamsterInfo";
import ResultComp from "./ResultComp";



const BattleComp2 = () => {

	const [randomHamster1, setRandomHamster1] = useState<Hamster | null >(null);
	const [randomHamster2, setRandomHamster2] = useState<Hamster | null >(null);
	const [hasVoted, setHasVoted] = useState(false);

	let updatedWinner:Promise<any>
	let updatedLoser:Promise<any>

	useEffect(() => {
		async function getRandomHamster(setHamster:(data:any) => void) {
			const response = await fetch('/hamsters/random', {method: 'GET'});
			const data = await response.json();
			setHamster(data);
			setHasVoted(false)
		}
		getRandomHamster(setRandomHamster1);
		getRandomHamster(setRandomHamster2);
	}, [])

	async function getHamsterWithId(firestoreId:string) {
		const getHamsterWithIdResponse = await fetch(`/hamsters/${firestoreId}`, {method: 'GET'});
		const getHamsterWithIdData = await getHamsterWithIdResponse.json();
		console.log(getHamsterWithIdData);
		return getHamsterWithIdData;
	}

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
			Promise.all([
				putHamster(winner.firestoreId, winnerUpdate),
				putHamster(loser.firestoreId, loserUpdate), 
				postMatch(winner.firestoreId, loser.firestoreId)
			]).then((values) => {
				console.log(values);
				
				updateHamsters(winner, loser)

				setHasVoted(true);
			});
		}
	}

	async function updateHamsters(winner:any, loser:any){
		updatedWinner = await getHamsterWithId(winner.firestoreId);
		updatedLoser = await getHamsterWithId(loser.firestoreId);
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
					<ResultComp hamster1={updatedWinner} hamster2={updatedLoser}/>
					{/* <button className="basic-btn" onClick={() =>setRunUseEffect(!runUseEffect)}>TÄVLA IGEN</button> */}
				</section>
			)
		}
	}
	const content = voteOrResult();

	return (
		<section className="battle-comp">
			{ content }		
		</section>
	);
}

export default BattleComp2;
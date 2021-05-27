import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import allHamsters from '../../atoms/atoms';
import HamsterInfo from "../gallery/HamsterInfo";
import ResultComp from './ResultComp';
import './battle-comp.css';
import { Hamster } from '../../types/hamster-interface';

const BattleComp = () => {

	const [hamsters, setHamsters] = useRecoilState(allHamsters); //useSetRecoilState
	const [randomHamster1, setRandomHamster1] = useState<Hamster | null>(null);
	const [randomHamster2, setRandomHamster2] = useState<Hamster | null>(null);
	const [hasVoted, setHasVoted] = useState(false);
	const [runUseEffect, setRunUseEffect] = useState(true);

	useEffect(() => {
		async function getHamsters() {
			const response = await fetch('/hamsters', {method: 'GET'});
			const data = await response.json();
			setHamsters(data);
		}
		getHamsters();

		console.log("TA BORT" , hamsters); // HUR TA BORT??? useSetRecoilState
		async function getRandomHamster(setHamster:(data:any) => void) {
			const response = await fetch('/hamsters/random', {method: 'GET'});
			const data = await response.json();
			setHamster(data);
			setHasVoted(false)
		}
		getRandomHamster(setRandomHamster1);
		getRandomHamster(setRandomHamster2);
		getHamsters();
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
			postMatch(winner.firestoreId, loser.firestoreId);
			setRunUseEffect(!runUseEffect);
			setHasVoted(true);
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
					{/* get hamster with id för att få uppdaterad information!*/}
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
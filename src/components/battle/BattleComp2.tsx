import { useEffect, useState } from "react";
import { Hamster } from "../../types/hamster-interface";
import HamsterInfo from "../gallery/HamsterInfo";
import './battle-comp.css'
import HamsterCard from "../gallery/HamsterCard";


const BattleComp2 = () => {

	const [randomHamster1, setRandomHamster1] = useState<Hamster | null >(null);
	const [randomHamster2, setRandomHamster2] = useState<Hamster | null >(null);
	const [updatedWinner, setUpdatedWinner] = useState<any>(null)
	const [updatedLoser, setUpdatedLoser] = useState<any>(null)
	const [hasVoted, setHasVoted] = useState(false);

	useEffect(() => {
		async function getRandomHamster(setHamster:(data:any) => void) {
			const response = await fetch('/hamsters/random', {method: 'GET'});
			const data = await response.json();
			setHamster(data);
			setHasVoted(false);
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
		console.log("voting winner: ", winner) //Här finns det värden.
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
			]).then(() => {
				console.log("voting winner: ", winner)
				updateHamsters(winner, loser)

				setHasVoted(true);
			});
		}
	}

	async function updateHamsters(winner:any, loser:any){
		const newWinner = await getHamsterWithId(winner.firestoreId);
		setUpdatedWinner(newWinner)
		const newLoser = await getHamsterWithId(loser.firestoreId);
		setUpdatedLoser(newLoser);
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
							<HamsterInfo buttonText={"RÖSTA"} hamster={randomHamster1} buttonFunction={() => voting(randomHamster1, randomHamster2)} showDelete={false} />
							<div className="vs-div">VS</div>
							<HamsterInfo buttonText={"RÖSTA"} hamster={randomHamster2} buttonFunction={() => voting(randomHamster2, randomHamster1)} showDelete={false}/>
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
			if (updatedWinner !== null && updatedLoser !== null) {
				return (
					<section className="after-battle">
						<h2>RESULTAT</h2>
						<section className="games-section">
							<div className="one-game">
								<div className="game-winner">
									<h3 className="games-header">VINNARE</h3>
									<HamsterCard hamster={updatedWinner}/>
									<ul>
										<li>Vinster: {updatedWinner.wins}</li>
										<li>Förluster: {updatedWinner.defeats}</li>
										<li>Matcher: {updatedWinner.games}</li>
									</ul>
								</div>
								<div className="vs-div">VS</div>
								<div className="game-loser">
									<h3 className="games-header">FÖRLORARE</h3>
									<HamsterCard hamster={updatedLoser}/>
									<ul>
										<li>Vinster: {updatedLoser.wins}</li>
										<li>Förluster: {updatedLoser.defeats}</li>
										<li>Matcher: {updatedLoser.games}</li>
									</ul>
								</div>
							</div>
						</section>
					</section>
				)
			} else {
				<section className="after-battle">
					<div>Loading hamsters...</div>
				</section>
			}
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
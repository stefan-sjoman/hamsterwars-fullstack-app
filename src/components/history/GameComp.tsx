import { useEffect, useState } from "react";
import HamsterCard from "../gallery/HamsterCard";

interface Props {
	match:any
}

const GameComp = ({match}:Props) => {

	const [winner, setWinner] = useState<any>();
	//const [loser, setLoser] = useState<any>();

	useEffect(() => {
		async function getWinner() {
			const getWinnerResponse = await fetch(`/hamsters/${match.winnerId}`, {method: 'GET'});
			const data = await getWinnerResponse.json();
			setWinner(data);
			console.log(data);
		}
		// async function getLoser() {
		// 	const getLoserResponse = await fetch(`/hamsters/${match.loserId}`, {method: 'GET'});
		// 	const data = await getLoserResponse.json();
		// 	setLoser(data);
		// 	console.log(data);
		// }
		getWinner();
		// getLoser();
	}, [])

	let JSX = <div></div>
	if (winner) {
		JSX = (
		<div className="one-game">
			<div className="game-winner">
				<h3 className="games-header">VINNARE</h3>
				<HamsterCard hamster={winner}/>
			</div>
			<div className="vs-div">VS</div>
			<div className="game-loser">
				<h3 className="games-header">FÖRLORARE</h3>
				<HamsterCard hamster={winner}/>
			</div>
		</div>
		)
	}
	return (
		<div>
			{JSX}
		</div>
	);
}

export default GameComp;
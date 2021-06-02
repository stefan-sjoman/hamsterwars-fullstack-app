import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { allHamsters, runGetHamsters } from "../../atoms/atoms";
import HamsterCard from "../gallery/HamsterCard";

interface Props {
	match:any
	setMatchesData: any
	runUseEffect: any
	setRunUseEffect: any
}

const GameComp = ({match, setMatchesData, runUseEffect, setRunUseEffect}:Props) => {

	const [hamsters] = useRecoilState(allHamsters);
	const [updateHamsters, setUpdateHamsters] = useRecoilState(runGetHamsters);
	const [winner, setWinner] = useState<any>();
	const [loser, setLoser] = useState<any>();
	const [infoFooter, setInfoFooter] = useState((
		<div className="info-footer">
			<button className="delete-btn" onClick={askDelete}>Radera match?</button>	
		</div>
	));

	useEffect(() => {
		setWinner(hamsters.find( ({ firestoreId }) => firestoreId === match.winnerId ));
		setLoser(hamsters.find( ({ firestoreId }) => firestoreId === match.loserId ));
	}, [hamsters, match.winnerId, match.loserId]);

	function askDelete() {
		setInfoFooter(
			<div className="info-footer">
				<p>Vill du radera matchen?</p>
				<button className="basic-btn" onClick={deleteMatch} >RADERA</button>
				<button className="secondary-btn" onClick={dontDelete}>AVBRYT</button>
			</div>
		)
	}
	async function deleteMatch() {
		if (!match) return;
		await fetch(`/matches/${match.firestoreId}`, {method: 'DELETE'});
		setUpdateHamsters(!updateHamsters);
		setMatchesData(null);
		setRunUseEffect(!runUseEffect);
	}
	function dontDelete() {
		setInfoFooter(
			<div className="info-footer">
					<button className="delete-btn" onClick={askDelete}>Radera match?</button>
			</div>
		)
	}

	let JSX = <div></div>
	if (winner && loser) {
		JSX = (
		<div className="one-game">
			<div className="game-winner">
				<h3 className="games-header">VINNARE</h3>
				<HamsterCard hamster={winner}/>
				<dl>
					<dt>Vinster:</dt>
					<dd>{winner.wins + " st"}</dd>
					<dt>Förluster:</dt>
					<dd>{winner.defeats + " st"}</dd>
					<dt>Matcher:</dt>
					<dd>{winner.games + " st"}</dd>
				</dl>
			</div>
			<div className="vs-div">VS</div>
			<div className="game-loser">
				<h3 className="games-header">FÖRLORARE</h3>
				<HamsterCard hamster={loser}/>
				<dl>
					<dt>Vinster:</dt>
					<dd>{loser.wins + " st"}</dd>
					<dt>Förluster:</dt>
					<dd>{loser.defeats + " st"}</dd>
					<dt>Matcher:</dt>
					<dd>{loser.games + " st"}</dd>
				</dl>
			</div>
			{infoFooter}
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
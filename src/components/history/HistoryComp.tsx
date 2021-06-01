
import { useEffect, useState } from "react";
import GameComp from "./GameComp";
import './history-comp.css';

const HistoryComp = () => {
	
	const [matchesData, setMatchesData] = useState<any[]>([])

	useEffect(() => {
		async function getMatches() {
			const getMatchesResponse = await fetch('/matches', {method: 'GET'});
			const data = await getMatchesResponse.json();
			setMatchesData(data);
			console.log(data);
		}
		getMatches();
	}, [])

	return(
		<section className="history-comp basic-main">
			<h2>SENASTE MATCHER</h2>
			<section className="games-section">		
				{matchesData ? <GameComp match={matchesData[0]} /> : null }
			</section>
		</section>
	);
}

export default HistoryComp;
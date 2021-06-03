
import { useEffect, useState } from "react";
import GameComp from "./GameComp";
import './history-comp.css';

const HistoryComp = () => {

	const [matchesData, setMatchesData] = useState<any[]>([]);
	const [runUseEffect, setRunUseEffect] = useState(true);

	useEffect(() => {
		async function getMatches() {
			const getMatchesResponse = await fetch('/matches', {method: 'GET'});
			const data = await getMatchesResponse.json();
			setMatchesData(data);
		}
		getMatches();
	}, [runUseEffect])


	if (matchesData) {
		const latestMatches = matchesData.map(match =>  
			(<GameComp key={match.firestoreId} match={match} setMatchesData={setMatchesData} runUseEffect={runUseEffect} setRunUseEffect={setRunUseEffect}/>)
		)
		return (
			<section className="history-comp basic-main">
				<h2>SENASTE MATCHER</h2>
				<section className="games-section">		
					{latestMatches}
				</section>
			</section>
		);
	} 
	return <div>Loading...</div>
}

export default HistoryComp;
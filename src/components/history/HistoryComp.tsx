
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

	if (matchesData) {
		const latestMatches = matchesData.map(match => 
			(<GameComp match={match} key={match.firestoreId}/>)
		)

		return (
			<section className="history-comp basic-main">
				<h2>SENASTE MATCHER</h2>
				<section className="games-section">		
					{latestMatches}
				</section>
			</section>
		);
	} else return <div>Loading...</div>
}

export default HistoryComp;
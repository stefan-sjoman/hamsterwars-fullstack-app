import { useEffect, useState } from 'react'
import { Hamster } from '../../types/hamster-interface'
import HamsterCard from '../gallery/HamsterCard'
import './statistics-comp.css'

const StatisticsComp = () => {

	const [topHamsterArray, setTopHamsterArray] = useState<Hamster[]>();
	const [bottomHamsterArray, setBottomHamsterArray] = useState<Hamster[]>();

	useEffect(() => {
		async function getWinners() {
			const getWinnersResponse = await fetch(`/winners`, {method: 'GET'});
			const getWinnersData = await getWinnersResponse.json();
			console.log(getWinnersData);
			setTopHamsterArray(getWinnersData);
		}
		async function getLosers() {
			const getLosersResponse = await fetch(`/losers`, {method: 'GET'});
			const getLosersData = await getLosersResponse.json();
			console.log(getLosersData);
			setBottomHamsterArray(getLosersData);
		}
		getWinners();
		getLosers();
	}, []);

	function listHamsters(hamster:Hamster) {
		return (
			<li key={hamster.firestoreId}>
				<HamsterCard hamster={hamster} />
				<dl>
					<dt>Vinster:</dt>
					<dd>{hamster.wins + " st"}</dd>
					<dt>Förluster:</dt>
					<dd>{hamster.defeats + " st"}</dd>
					<dt>Matcher:</dt>
					<dd>{hamster.games + " st"}</dd>
				</dl>
			</li>
		)
	}
	
	function getHamsters(hamsterArray:Hamster[]) {
		const content = hamsterArray.map(hamster => 
			listHamsters(hamster)
		)
		return (
			<ol>
				{content}
			</ol>
		)
	}

	if (topHamsterArray && bottomHamsterArray) {
		const topHamsters = getHamsters(topHamsterArray);
		const bottomHamsters = getHamsters(bottomHamsterArray);

		return ( 
			<section className="statistics-comp">
				<div>
					<h2>TOPP 5</h2>
					{ topHamsters }	
				</div>
				<div>
					<h2>SISTA 5</h2>
					{ bottomHamsters }	
				</div>
			</section>
		);
	} else {
		return (
			<section className="statistics-comp">
			</section>
		)
	}
}

export default StatisticsComp;
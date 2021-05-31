import { useState } from 'react'
import { Hamster } from '../../types/hamster-interface'
import HamsterCard from '../gallery/HamsterCard'
import './statistics-comp.css'

const StatisticsComp = () => {

	/*********************************************** */
	let tempHamster = {
		"name": "Alma",
		"favFood": "ananas",
		"wins": 5,
		"age": 3,
		"loves": "bli klappad",
		"defeats": 17,
		"imgName": "hamster-35.jpg",
		"games": 25,
		"firestoreId": "0S4wKVHGdkWKIpygFz9Y"
	}
	let tempArray:Hamster[] = [tempHamster,tempHamster,tempHamster,tempHamster,tempHamster];

	/**************************************************/

	const [topHamsterArray, setTopHamsterArray] = useState<Hamster[]>(tempArray);
	const [bottomHamsterArray, setBottomHamsterArray] = useState<Hamster[]>(tempArray);

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
	
	const topHamsters = getHamsters(topHamsterArray);
	const bottomHamsters = getHamsters(bottomHamsterArray);
	
	return( 
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
}

export default StatisticsComp;
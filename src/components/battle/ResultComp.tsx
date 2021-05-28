import HamsterCard from '../gallery/HamsterCard';
import { Hamster } from '../../types/hamster-interface';
import './result-comp.css';
import { useEffect, useState } from 'react';

interface Props {
	randomHamster1: Hamster | null
	randomHamster2: Hamster | null
}

const ResultComp = ({randomHamster1, randomHamster2}:Props) => {

	const [hamster1, setHamster1] = useState<Hamster | null | any>(null); // TODO any är för getHamsterWithId
	const [hamster2, setHamster2] = useState<Hamster | null | any>(null);

	async function getHamsterWithId(firestoreId:string) {
		const getHamsterWithIdResponse = await fetch(`/hamsters/${firestoreId}`, {method: 'GET'});
		const getHamsterWithIdData = await getHamsterWithIdResponse.json();
		console.log(getHamsterWithIdData);
		return getHamsterWithIdData;
	}
	async function updateRandomHamsters() {
		if (randomHamster1 && randomHamster2) {
		const hamsterTemp1 = await getHamsterWithId(randomHamster1.firestoreId)
		const hamsterTemp2 = await getHamsterWithId(randomHamster2.firestoreId);
		setHamster1(hamsterTemp1);
		console.log('hamstertemp1',hamsterTemp1);
		setHamster2(hamsterTemp2);
		}
	}
	useEffect(() => {
		if (randomHamster1 && randomHamster2) {
			updateRandomHamsters();
		}
	})

	function loadingOrResult() {
		if (hamster1 && hamster2) {
			console.log( "vadfinns?",hamster1, hamster2);
			return (
				<section className="result-comp-inner">
				<div>
					<HamsterCard hamster={hamster1}/>
					<ul>
						<li>Vinster: { hamster1.wins}</li>	
						<li>Förluster: { hamster1.defeats}</li>
						<li>Matcher: {hamster1.games}</li>
					</ul> 
				</div> 
				<div className="result-comp-vs">VS</div>
				<div>
					<HamsterCard hamster={hamster2}/>
					<ul>
						<li>Vinster: {hamster2.wins}</li>
						<li>Förluster: {hamster2.defeats}</li>
						<li>Matcher: {hamster2.games}</li>
					</ul>
				</div>
			</section>	
			)
		} else {
			return (
				<div>Laddar hamstrar...</div>
			)
		}
	}

	const content = loadingOrResult();

	return (
		<section className="result-comp">
			{ content }
		</section>
	);
}

export default ResultComp;
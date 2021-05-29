import HamsterCard from '../gallery/HamsterCard';
import { Hamster } from '../../types/hamster-interface';
import './result-comp.css';
import { useState } from 'react';

interface Props {
	hamsterIn1: Hamster | null | any
	hamsterIn2: Hamster | null | any
}

const ResultComp = ({hamsterIn1, hamsterIn2}:Props) => {

	const [hamster1, setHamster1] = useState(hamsterIn1);
	const [hamster2, setHamster2] = useState(hamsterIn2);

	function loadingOrResult() {

	console.log( "vadfinns?",hamster1, hamster2);
	return (
		<section className="games-section">
			<div className="one-game">
				<div className="game-winner">
					<HamsterCard hamster={hamster1}/>
					<ul>
						<li>Vinster: {hamster1.wins}</li>
						<li>Förluster: {hamster1.defeats}</li>
						<li>Matcher: {hamster1.games}</li>
					</ul>
				</div>
				<div className="vs-div">VS</div>
				<div className="game-loser">
					<h3 className="games-header">FÖRLORARE</h3>
					<HamsterCard hamster={hamster2}/>
					<ul>
						<li>Vinster: {hamster2.wins}</li>
						<li>Förluster: {hamster2.defeats}</li>
						<li>Matcher: {hamster2.games}</li>
					</ul>
				</div>
			</div>
		</section>
		)
	}

	const content = loadingOrResult();

	return (
		<section className="result-comp">
			{ content }
		</section>
	);
}

export default ResultComp;
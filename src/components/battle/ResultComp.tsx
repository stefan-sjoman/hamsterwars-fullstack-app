import HamsterCard from '../gallery/HamsterCard';
import { Hamster } from '../../types/hamster-interface';
import './result-comp.css';

interface Props {
	randomHamster1: Hamster | null
	randomHamster2: Hamster | null
}

const ResultComp = ({randomHamster1, randomHamster2}:Props) => {
	return(
		<section className="result-comp">	
			<div>
				<HamsterCard hamster={randomHamster1}/>
				<ul>
					<li>Vinster: {randomHamster1? randomHamster1.wins : ""}</li>	
					<li>Förluster: {randomHamster1? randomHamster1.defeats : ""}</li>
					<li>Matcher: {randomHamster1? randomHamster1.games : ""}</li>
				</ul> 
			</div> 
			<div className="result-comp-vs">VS</div>
			<div>
				<HamsterCard hamster={randomHamster2}/>
				<ul>
					<li>Vinster: {randomHamster2? randomHamster2.wins : ""}</li>
					<li>Förluster: {randomHamster2? randomHamster2.defeats : ""}</li>
					<li>Matcher: {randomHamster2? randomHamster2.games : ""}</li>
				</ul>
			</div>
		</section>
	);
}

export default ResultComp;
import HamsterCard from '../gallery/HamsterCard';
import { Hamster } from '../../types/hamster-interface';
import './result-comp.css';

interface Props {
	hamster1: Hamster | null | any
	hamster2: Hamster | null | any
}

const ResultComp = ({hamster1, hamster2}:Props) => {

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
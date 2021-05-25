import { Hamster } from '../../types/hamster-interface';
import './hamster-info.css';

interface Props {
	hamster: Hamster | null;
	closeHamster: () => void;
}

const HamsterInfo = ({hamster, closeHamster}:Props) => {

	return (
		hamster ? 
		<section className="hamster-info">
			
			<img src={`img/${hamster.imgName}`}alt="Bild på en hamster" />
			<h2>{hamster.name}</h2>
			<dl>
				<dt>Ålder:</dt>
				<dd>{hamster.age + " år"}</dd>
				<dt>Favoritmat:</dt>
				<dd>{hamster.favFood}</dd>
				<dt>Älskar:</dt>
				<dd>{hamster.loves}</dd>
				<dt>Matcher:</dt>
				<dd>{hamster.games + " st"}</dd>
			</dl>
			<button className="close-btn" onClick={closeHamster}>STÄNG</button>
		</section>
		: <section>

		</section>
	);
}

export default HamsterInfo;
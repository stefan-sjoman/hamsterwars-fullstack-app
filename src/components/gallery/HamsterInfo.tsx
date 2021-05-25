import { Hamster } from '../../types/hamster-interface';
import './hamster-info.css';

interface Props {
	buttonText: string
	hamster: Hamster | null
	buttonFunction: () => void
}

const HamsterInfo = ({buttonText, hamster, buttonFunction}:Props) => {

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
			<button className="close-btn" onClick={buttonFunction}>{buttonText}</button>
		</section>
		: <section>

		</section>
	);
}

export default HamsterInfo;
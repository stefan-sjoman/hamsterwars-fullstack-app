import { useState } from 'react';
import { Hamster } from '../../types/hamster-interface';
import './hamster-info.css';

interface Props {
	buttonText: string
	hamster: Hamster | null
	buttonFunction: () => void
}

const HamsterInfo = ({buttonText, hamster, buttonFunction}:Props) => {

	const [infoFooter, setInfoFooter] = useState((
		<div className="info-footer">
			<button className="basic-btn" onClick={buttonFunction}>{buttonText}</button>
			<button className="delete-btn" onClick={askDelete}>Radera hamster</button>
		</div>
	));

	
	function askDelete() {
		setInfoFooter(
			<div className="info-footer">
				<p>Vill du radera hamstern?</p>
				<button className="basic-btn" onClick={deleteHamster}>RADERA</button>
				<button className="secondary-btn" onClick={dontDelete}>AVBRYT</button>
			</div>
		)
	}
	function deleteHamster() {
		alert("Hamster är raderad.")
		buttonFunction();
	}
	function dontDelete() {
		setInfoFooter(
			<div className="info-footer">
				<button className="basic-btn" onClick={buttonFunction}>{buttonText}</button>
				<button className="delete-btn" onClick={askDelete}>Radera hamster?</button>
			</div>)
	}

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
			{infoFooter}
		</section>
		: <section>

		</section>
	);
}

export default HamsterInfo;
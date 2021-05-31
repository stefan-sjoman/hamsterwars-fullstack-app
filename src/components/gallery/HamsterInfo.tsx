import { useState } from 'react';
import { Hamster } from '../../types/hamster-interface';
import { runGetHamsters } from '../../atoms/atoms';
import './hamster-info.css';
import { useRecoilState } from 'recoil';

interface Props {
	buttonText: string
	hamster: Hamster | null
	buttonFunction: () => void
	showDelete: boolean
}

const HamsterInfo = ({buttonText, hamster, buttonFunction, showDelete}:Props) => {

	const [updateHamsters, setUpdateHamsters] = useRecoilState(runGetHamsters);
	const [infoFooter, setInfoFooter] = useState((
		<div className="info-footer">
			<button className="basic-btn" onClick={buttonFunction}>{buttonText}</button>
			{showDelete ? 
					<button className="delete-btn" onClick={askDelete}>Radera hamster?</button>
				:
				null
			}	
		</div>
	));

	/* Hämta matchWinner med hamsterns ID.*/
	// får ner matchobject i en array.
	// för varje matchobject, spara loserId.
	// hämta alla besegrade hamstrar till en array.
	const [matchesWon, setMatchesWon] = useState<any[]>([null]);
	const [losersId, setLosersId] = useState<any[]>([null]);
	const [defeatedHamsters, setDefeatedHamsters] = useState<string[]>([
		"Hamster1",
		"Hamster2"
	]);

	function askDelete() {
		setInfoFooter(
			<div className="info-footer">
				<p>Vill du radera hamstern?</p>
				<button className="basic-btn" onClick={deleteHamster}>RADERA</button>
				<button className="secondary-btn" onClick={dontDelete}>AVBRYT</button>
			</div>
		)
	}
	async function deleteHamster() {
		if (!hamster) return;
		await fetch(`/hamsters/${hamster.firestoreId}`, {method: 'DELETE'});
		setUpdateHamsters(!updateHamsters);
		buttonFunction();
	}
	function dontDelete() {
		setInfoFooter(
			<div className="info-footer">
				<button className="basic-btn" onClick={buttonFunction}>{buttonText}</button>
				{showDelete ? 
					<button className="delete-btn" onClick={askDelete}>Radera hamster?</button>
				:
				null
				}	
			</div>)
	}

	const defeatedHamsterList = 
		defeatedHamsters.map(defeatedHamster =>
			<dd>{defeatedHamster}</dd>	
		);
	const defeatedDt = (<dt>Besegrat:</dt>)
	
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
				{defeatedHamsters.length > 0 ? 
					defeatedDt : null }
				{defeatedHamsters.length > 0 ? 
					defeatedHamsterList : null }
			</dl>
			{infoFooter}
		</section>
		: null
	)
}

export default HamsterInfo;
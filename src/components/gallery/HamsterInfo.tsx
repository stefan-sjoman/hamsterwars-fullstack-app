import { useEffect, useState } from 'react';
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
	const [defeatedHamsters, setDefeatedHamsters] = useState<any[]>([
		"Hamster1",
		"Hamster2"
	]);
	const [defeatedHamsterList, setDefeatedHamsterList] = useState<any>(null);
	
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
				: null }	
			</div>)
	}

	useEffect(() => {
		async function getMatchWinners() {
			if (!showDelete) return;
			if (!hamster) return;
			
			const getMatchWinnersResponse = await fetch(`/matchwinners/${hamster.firestoreId}`, {method: 'GET'});
				const data = await getMatchWinnersResponse.json();
				console.log("getMatchWinners data", data);

////////////////////////////////////////////////////////

			if (!data) return;
			const matches:any[] = data;

			console.log("matches", matches)
			let tempLosersId:any[] = [];

			matches.forEach(match => {
				const loserId = match.loserId;
				tempLosersId.push(loserId);
			})

			console.log("getLosersId tempLosersId", tempLosersId);

////////////////////////////////////////////////////

			if (tempLosersId === null) return;

			let tempLosers:any[] = [];
	
			const newLoser = await getHamsterWithId(tempLosersId[0]);
			console.log("newLoser" , newLoser);
			tempLosers.push(newLoser);
			
			console.log("getLosersName tempLosersId", tempLosers[0]);

			let list = <dd>{tempLosers[0].name}</dd>
			setDefeatedHamsterList(list)
		}
		getMatchWinners();
	}, [])

	async function getHamsterWithId(firestoreId:string) {
		const getHamsterWithIdResponse = await fetch(`/hamsters/${firestoreId}`, {method: 'GET'});
		const getHamsterWithIdData = await getHamsterWithIdResponse.json();
		console.log(getHamsterWithIdData);
		return getHamsterWithIdData;
	}
	
	const defeatedDt = <dt>Besegrat:</dt>
	
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
				{defeatedDt}
				{defeatedHamsterList}
			</dl>
			{infoFooter}
		</section>
		: null
	)
}

export default HamsterInfo;
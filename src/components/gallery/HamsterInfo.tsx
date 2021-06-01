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
	const [matchesWon, setMatchesWon] = useState<any[]>([null]);
	const [losersId, setLosersId] = useState<any[]>([null]);
	const [defeatedHamsters, setDefeatedHamsters] = useState<any[]>([
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
				: null }	
			</div>)
	}

	// useEffect(() => {
	// 	async function getMatchWinners() {
	// 		if (!showDelete) return;
	// 		if (!hamster) return;
			
	// 		const getMatchWinnersResponse = await fetch(`/matchwinners/${hamster.firestoreId}`, {method: 'GET'});
	// 			const data = await getMatchWinnersResponse.json();
	// 			console.log("getMatchWinners data", data);
				
	// 			setMatchesWon(data);
	// 			getLosersId();
	// 	}

	// 	function getLosersId() {
	// 		if (!matchesWon) return;

	// 		let tempLosersId:string[] = [];
	// 		matchesWon.forEach(match => {
	// 			tempLosersId.push(match.loserId);
	// 		})

	// 		console.log("getLosersId tempLosersId", tempLosersId);
	// 		setLosersId(tempLosersId);
	// 		getLosersName();
	// 	}

	// 	function getLosersName() {
	// 		if (losersId === null) return;

	// 		let tempLosers:any[] = [];
	// 		losersId.forEach(loserId => {
	// 			const newLoser = getHamsterWithId(loserId);
	// 			tempLosers.push(newLoser)
	// 		})
	// 		console.log("getLosersName tempLosersId", tempLosers);
	// 		setDefeatedHamsters(tempLosers);
	// 	}
	// 	getMatchWinners();
	// }, [])


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

			let tempLosersId:any[] = [];

			matches.forEach(match => {
				const loserId = match.loserId;
				tempLosersId.push(loserId);
			})

			console.log("getLosersId tempLosersId", tempLosersId);

////////////////////////////////////////////////////

			if (tempLosersId === null) return;

			let tempLosers:any[] = [];
			tempLosersId.forEach(loserId => {
				const newLoser = getHamsterWithId(loserId); //Varför funkar inte await
				tempLosers.push(newLoser);
			})
			console.log("getLosersName tempLosersId", tempLosers);
			setDefeatedHamsters(tempLosers);
		}
		getMatchWinners();
	}, [])




	async function getHamsterWithId(firestoreId:string) {
		const getHamsterWithIdResponse = await fetch(`/hamsters/${firestoreId}`, {method: 'GET'});
		const getHamsterWithIdData = await getHamsterWithIdResponse.json();
		console.log(getHamsterWithIdData);
		return getHamsterWithIdData;
	}

	function buildDefeatedList() {
		return defeatedHamsters.length > 0 ? 
		defeatedHamsters.forEach(defeatedHamster =>
			<dd>{defeatedHamster.name}</dd>) : null;
	}
	const defeatedHamsterList = buildDefeatedList();
	const defeatedDt = defeatedHamsters.length > 0 ? <dt>Besegrat:</dt> : null ;
	
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
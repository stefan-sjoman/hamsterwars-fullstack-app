import { useEffect, useState } from 'react';
import { Hamster } from '../../types/hamster-interface';
import { runGetHamsters, allHamsters } from '../../atoms/atoms';
import './hamster-info.css';
import { useRecoilState } from 'recoil';

interface Props {
	buttonText: string
	hamster: Hamster | null
	buttonFunction: () => void
	showDeleteAndDefeated: boolean
}

const HamsterInfo = ({buttonText, hamster, buttonFunction, showDeleteAndDefeated}:Props) => {

	const [hamsters] = useRecoilState(allHamsters);
	const [updateHamsters, setUpdateHamsters] = useRecoilState(runGetHamsters);
	const [infoFooter, setInfoFooter] = useState((
		<div className="info-footer">
			<button className="basic-btn" onClick={buttonFunction}>{buttonText}</button>
			{showDeleteAndDefeated ? 
					<button className="delete-btn" onClick={askDelete}>Radera hamster?</button>
				:
				null
			}	
		</div>
	));
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
				{showDeleteAndDefeated ? 
					<button className="delete-btn" onClick={askDelete}>Radera hamster?</button>
				: null }	
			</div>)
	}

	useEffect(() => {
		async function getMatchWinners() {
			if (!showDeleteAndDefeated) return;
			if (!hamster) return;
			
			const getMatchWinnersResponse = await fetch(`/matchwinners/${hamster.firestoreId}`, {method: 'GET'});
			let data: any
			let list:any[] = [];
			if (getMatchWinnersResponse.status === 200) {
				data = await getMatchWinnersResponse.json();
				const matches:any[] = data;
				let tempLosersId:any[] = [];
				matches.forEach(match => {
					const loserId = match.loserId;
					tempLosersId.push(loserId);
				});
	
				if (tempLosersId === null) return;
				let tempLosers:any[] = [];
				tempLosersId.forEach(id => {
					tempLosers.push(hamsters.find( ({ firestoreId }) => firestoreId === id )
				)});
				
				tempLosers.forEach(loser => {
					list.push(<dd key={loser.firestoreId}>{loser.name}</dd>)
				});
			} else {
				list.push(<dd key={"404"}>Ingen vinst</dd>);
			}		
			setDefeatedHamsterList(list)
		}
		getMatchWinners();
	}, [hamsters, hamster, showDeleteAndDefeated])
	
	function showDefeated() {
		if (showDeleteAndDefeated) {
			return <dt>Besegrat:</dt>
		} return null
	}

	const defeatedDt = showDefeated()
	
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
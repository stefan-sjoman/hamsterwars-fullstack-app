import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { allHamsters, runGetHamsters } from '../../atoms/atoms';
import HamsterInfo from './HamsterInfo';
import HamsterCard from './HamsterCard';
import { Hamster } from '../../types/hamster-interface';
import './gallery-comp.css';

const GalleryComp = () => {

	const [hamsters] = useRecoilState(allHamsters);
	const [updateHamsters, setUpdateHamsters] = useRecoilState(runGetHamsters);
	const [clickedHamster, setClickedHamster] = useState<null | Hamster>(null)
	const [showHamster, setShowHamster] = useState(false);
	const [showAddNew, setShowAddNew] = useState(false);

	const [inputName, setInputName] = useState("");
	const [inputAge, setInputAge] = useState("");
	const [inputFavFood, setInputFavFood] = useState("");
	const [inputLoves, setInputLoves] = useState("");
	const [inputImgName, setInputImgName] = useState("");

	const [nameError, setNameError] = useState("");
	const [ageError, setAgeError] = useState("");
	const [favFoodError, setFavFoodError] = useState("");
	const [lovesError, setLovesError] = useState("");
	const [imgNameError, setImgNameError] = useState("");

	function openHamster(hamster:Hamster) {
		setShowHamster(true);
		setClickedHamster(hamster);
	}

	function closeHamster() {
		setShowHamster(false);
	}

	function validateName(event:any) {
		const name = event.target.value;
		let validated = validateText(name);
		if (!validated) {
			return setNameError("Namn får vara max 32 tecken");
		}
		setNameError("");
		setInputName(name);
	}
	function validateAge(event:any) {
		const age = event.target.value;
		if (age < 0) return setAgeError("Åldern får inte vara under 0 år");
		if (age > 9) return setAgeError("Åldern får inte vara över 9 år");
		setAgeError("");
		setInputAge(age);
	}
	function validateFavFood(event:any) {
		const favFood = event.target.value;
		let validated = validateText(favFood);
		if (!validated) return setFavFoodError("Favoritmat får vara max 32 tecken");
		setFavFoodError("");
		setInputFavFood(favFood);
	}
	function validateLoves(event:any) {
		const loves = event.target.value;
		let validated = validateText(loves);
		if (!validated) return setLovesError("Älskar får vara max 32 tecken");
		setLovesError("");
		setInputLoves(loves);
	}
	function validateImgName(event:any) {
		const imgName = event.target.value;
		let validated = validateText(imgName);
		if (!validated) return setImgNameError("Bildadress får vara max 32 tecken");
		if (imgName.includes("http")) return setImgNameError("Bildadress måste vara lokal adress");
		setImgNameError("");		
		setInputImgName(imgName);
	}
	function validateText(text:string) {
		if (text.length > 32) return false;
		return true;
	}
	function nameToShort(event:any) {
		const name = event.target.value;
		if (name.length < 3) return setNameError("Namn måste vara minst 3 bokstäver");
	}
	function ageIsEmpty(event:any) {
		const age = event.target.value;
		if (age.length === 0) return setAgeError("Ålder måste vara ifyllt");
	}
	function favFoodToShort(event:any) {
		const favFood = event.target.value;
		if (favFood.length < 3) return setFavFoodError("Favoritmat måste vara minst 3 bokstäver");
	}
	function lovesToShort(event:any) {
		const loves = event.target.value;
		if (loves.length < 3) return setLovesError("Älskar måste vara minst 3 bokstäver");
	}
	function imgNameIsImage(event:any) {
		const imgName = event.target.value 
		if (imgName.length === 0) return setImgNameError("Bildadress måste finnas");
		if (!imgName.endsWith('.jpg')) return setImgNameError("Endast .jpg bilder är tillåtna");
		if (imgName === '.jpg') return setImgNameError("Kontrollera bildadressen");
	}
	async function addHamster() {
		const newHamster = {
			name: inputName,
			age: inputAge,
			favFood: inputFavFood,
			loves: inputLoves,
			imgName: inputImgName,
			wins: 0,
			defeats: 0,
			games: 0
		}
		console.log(newHamster);
		
		const postHamsterResponse = await fetch(`/hamsters`, {method: 'POST', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify(newHamster)});
		const putData = await postHamsterResponse.text();
		console.log(putData);
		setUpdateHamsters(!updateHamsters);
		setShowAddNew(!showAddNew);
	}

	function showGalleryOrHamster() {
		if (!showHamster) {
			return (
				<section className="gallery-comp">
					<h2>GALLERI</h2>
					<section className="add-new-section">					
						{!showAddNew ? 
							<section className="small-form-section">
								<p>Lägg till din egna hamster och tävla!</p>
								<button className="basic-btn" onClick={() => setShowAddNew(!showAddNew)}>LÄGG TILL</button>
							</section>
						:
							<section className="big-form-section">
								<h3>LÄGG TILL HAMSTER</h3>
								<div className="add-new-form">
									<label htmlFor="name">Namn:</label>
									<input type="text" name="name" value={inputName} onChange={validateName} onBlur={nameToShort}/>
									<div className="error-message">{nameError}</div>
									<label htmlFor="age">Ålder:</label>
									<input type="number" name="age" value={inputAge} onChange={validateAge} onBlur={ageIsEmpty}/>
									<div className="error-message">{ageError}</div>
									<label htmlFor="favFood">Favoritmat:</label>
									<input type="text" name="favFood" value={inputFavFood} onChange={validateFavFood} onBlur={favFoodToShort}/>
									<div className="error-message">{favFoodError}</div>
									<label htmlFor="loves">Älskar:</label>
									<input type="text" name="loves" value={inputLoves} onChange={validateLoves} onBlur={lovesToShort}/>
									<div className="error-message">{lovesError}</div>
									<label htmlFor="imgName">Bildadress:</label>
									<input type="text" name="imgName" value={inputImgName} onChange={validateImgName} onBlur={imgNameIsImage}/>
									<div className="error-message">{imgNameError}</div>
									<div className="button-div">
										<button className="basic-btn" onClick={addHamster}>LÄGG TILL</button>
									</div>
								</div>
							</section>
						}
					</section>
					<section className="gallery-section">
						<h2>HAMSTRAR</h2>
						<div className="gallery-div">
							{hamsters.length > 0 ? 
								hamsters.map(hamster => (
									<div onClick={() => openHamster(hamster)} key={hamster.firestoreId}>
										<HamsterCard hamster={hamster} />
									</div>		
								))
							: "Laddar in hamstrar..." }
						</div>
					</section>	
				</section> 
			)
		} else {
			return (
			<section className="open-hamster-section basic-main">
				<HamsterInfo buttonText={"STÄNG"} hamster={clickedHamster} buttonFunction={closeHamster} showDelete={true}/>
			</section>	
			)
		}
	}
	
	const galleryOrHamster = showGalleryOrHamster();

	return(
			galleryOrHamster
	);
}

export default GalleryComp;
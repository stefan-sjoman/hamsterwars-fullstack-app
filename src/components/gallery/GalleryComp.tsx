import { useState } from 'react';
import { useRecoilState } from 'recoil';
import allHamsters from '../../atoms/atoms';
import HamsterInfo from './HamsterInfo';
import HamsterCard from './HamsterCard';
import { Hamster } from '../../types/hamster-interface';
import './gallery-comp.css';

const GalleryComp = () => {

	const [hamsters] = useRecoilState(allHamsters);
	const [clickedHamster, setClickedHamster] = useState<null | Hamster>(null)
	const [showHamster, setShowHamster] = useState(false);


	function openHamster(hamster:Hamster) {
		setShowHamster(true);
		setClickedHamster(hamster);
	}
	function closeHamster() {
		setShowHamster(false);
	}

	return(
		<section className="gallery-comp">
			{
			!showHamster ?
			<section className="gallery-section">
				{hamsters.length > 0 ? 
					hamsters.map(hamster => (
						<div onClick={() => openHamster(hamster)} key={hamster.firestoreId}>
							<HamsterCard hamster={hamster} />
						</div>		
					))
				: "Laddar in hamstrar..." }
			</section> 
			:	
			<section className="open-hamster-section">
				<HamsterInfo buttonText={"STÄNG"} hamster={clickedHamster} closeHamster={closeHamster}/>
			</section>		
		}
		</section>
	);
}

export default GalleryComp;
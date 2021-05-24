import { useRecoilState } from 'recoil';
import allHamsters from '../../atoms/atoms';


import HamsterCard from './HamsterCard';
import './gallery-comp.css';

const GalleryComp = () => {

	const [hamsters] = useRecoilState(allHamsters);

	return(
		<section className="gallery-comp">
			{hamsters.length > 0 ? 
				hamsters.map(hamster => (
					<HamsterCard hamster={hamster} key={hamster.firestoreId} />
				))
				: "Laddar in hamstrar..."
			}
		</section>
	);
}

export default GalleryComp;
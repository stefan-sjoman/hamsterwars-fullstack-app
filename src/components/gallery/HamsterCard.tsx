import { Hamster } from '../../types/hamster-interface';
import './hamster-card.css';

interface Props {
	hamster: Hamster
}

const HamsterCard = ({hamster}:Props) => {

	const hamsterImage = `img/${hamster.imgName}`;

	return(
		<section className="hamster-card">
			<img src={hamsterImage} alt="Bild på en hamster" />
			<h3>{hamster.name}</h3>
		</section>
	);
}

export default HamsterCard;
import './start-comp.css';
import { Link } from 'react-router-dom';

const StartComp = () => {
	return (
		<section className="start-comp">
			<p>
				Hamsterwars är stället där hamstrar krigar om vem som är sötast! Om du går till tävla kan du rösta på den sötaste av två slumpmässigt utvalda hamstrar! I galleriet kan du se alla hamstrar och läsa mer om dom! Är du riktig modig kan du lägga till din egen hamster för att se om den har vad som krävs för att bli: VÄRLDENS SÖTASTE HAMSTER!?
			</p>
			<div>
				<Link to="/battle"><button className="basic-btn">TÄVLA</button></Link>
				<Link to="/gallery"><button className="basic-btn">GALLERI</button></Link>
			</div>
		</section>
	);
}

export default StartComp;
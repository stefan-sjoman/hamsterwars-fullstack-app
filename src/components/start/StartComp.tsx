import './start-comp.css';

const StartComp = () => {
	return (
		<section className="start-comp">
			<p>
				Hamsterwars är stället där hamstrar krigar om vem som är sötast! Om du går till tävla kan du rösta på den sötaste av två slumpmässigt utvalda hamstrar! I galleriet kan du se alla hamstrar och läsa mer om dom! Är du riktig modig kan du lägga till din egen hamster för att se om den har vad som krävs för att bli: VÄRLDENS SÖTASTE HAMSTER!?
			</p>
			<div>
				<button className="basic-btn">TÄVLA</button>
				<button className="basic-btn">GALLERI</button>
			</div>
			
		</section>
	);
}

export default StartComp;
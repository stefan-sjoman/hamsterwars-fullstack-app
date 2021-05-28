
import HamsterCard from "../gallery/HamsterCard";
import './history-comp.css';

const HistoryComp = () => {
	
	let tempHamster = {
		"name": "Alma",
		"favFood": "ananas",
		"wins": 5,
		"age": 3,
		"loves": "bli klappad",
		"defeats": 17,
		"imgName": "hamster-35.jpg",
		"games": 25,
		"firestoreId": "0S4wKVHGdkWKIpygFz9Y"
	}

	return(
		<section className="history-comp">
			<h2>SENASTE MATCHER</h2>
			<section className="games-section">
				<div className="one-game">
					<div className="game-winner">
						<h3 className="games-header">VINNARE</h3>
						<HamsterCard hamster={tempHamster}/>
						<ul>
							<li>Vinster: {tempHamster.wins}</li>
							<li>Förluster: {tempHamster.defeats}</li>
							<li>Matcher: {tempHamster.games}</li>
						</ul>
					</div>
					<div className="vs-div">VS</div>
					<div className="game-loser">
						<h3 className="games-header">FÖRLORARE</h3>
						<HamsterCard hamster={tempHamster}/>
						<ul>
							<li>Vinster: {tempHamster.wins}</li>
							<li>Förluster: {tempHamster.defeats}</li>
							<li>Matcher: {tempHamster.games}</li>
						</ul>
					</div>
				</div>
			</section>
		</section>
	);
}

export default HistoryComp;
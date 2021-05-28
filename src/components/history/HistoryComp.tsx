import ResultComp from "../battle/ResultComp";
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
				<div className="games-header">
					<h3>VINNARE</h3><h3>FÖRLORARE</h3>
				</div>
				<ResultComp hamster1={tempHamster} hamster2={tempHamster}/>
				<div className="games-header">
					<h3>VINNARE</h3><h3>FÖRLORARE</h3>
				</div>
				<ResultComp hamster1={tempHamster} hamster2={tempHamster}/>
				<div className="games-header">
					<h3>VINNARE</h3><h3>FÖRLORARE</h3>
				</div>
			</section>
		</section>
	);
}

export default HistoryComp;
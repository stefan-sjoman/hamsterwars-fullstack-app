import HamsterInfo from "../gallery/HamsterInfo";
import './battle-comp.css';

const BattleComp = () => {

	function closeHamster() {
		alert("Hej");
	}
	let hamster1 = {"loves":"bli klappad","age":3,"games":25,"defeats":17,"wins":5,"name":"Alma","imgName":"hamster-35.jpg","favFood":"ananas","firestoreId":"0S4wKVHGdkWKIpygFz9Y"};
	let hamster2 = {"loves":"bli klappad","age":3,"games":25,"defeats":17,"wins":5,"name":"Alma","imgName":"hamster-35.jpg","favFood":"ananas","firestoreId":"0S4wKVHGdkWKIpygFz9Y"};
	return (
		<section className="battle-comp">
			<HamsterInfo buttonText={"RÖSTA"} hamster={hamster1} closeHamster={closeHamster} />
			<div className="battle-comp-vs">VS</div>
			<HamsterInfo buttonText={"RÖSTA"} hamster={hamster2} closeHamster={closeHamster}/>
		</section>
	);
}

export default BattleComp;
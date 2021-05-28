import HamsterCard from '../gallery/HamsterCard'
import './statistics-comp.css'

const StatisticsComp = () => {

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
		<section className="statistics-comp">
			<div>
				<h2>TOPP 5</h2>
				<ol>
					<li>
						<HamsterCard hamster={tempHamster} />
						<ul>
							<li>Vinster: {tempHamster.wins}</li>
							<li>Förluster: {tempHamster.defeats}</li>
							<li>Matcher: {tempHamster.games}</li>
						</ul>
					</li>
					<li>
						<HamsterCard hamster={tempHamster} />
						<ul>
							<li>Vinster: {tempHamster.wins}</li>
							<li>Förluster: {tempHamster.defeats}</li>
							<li>Matcher: {tempHamster.games}</li>
						</ul>
					</li>
					<li>
						<HamsterCard hamster={tempHamster} />
						<ul>
							<li>Vinster: {tempHamster.wins}</li>
							<li>Förluster: {tempHamster.defeats}</li>
							<li>Matcher: {tempHamster.games}</li>
						</ul>
					</li>
					<li>
						<HamsterCard hamster={tempHamster} />
						<ul>
							<li>Vinster: {tempHamster.wins}</li>
							<li>Förluster: {tempHamster.defeats}</li>
							<li>Matcher: {tempHamster.games}</li>
						</ul>
					</li>
					<li>
						<HamsterCard hamster={tempHamster} />
						<ul>
							<li>Vinster: {tempHamster.wins}</li>
							<li>Förluster: {tempHamster.defeats}</li>
							<li>Matcher: {tempHamster.games}</li>
						</ul>
					</li>

				</ol>
			</div>
			<div>
				<h2>SISTA 5</h2>
				<ol>
					<li>
						<HamsterCard hamster={tempHamster} />
						<ul>
							<li>Vinster: {tempHamster.wins}</li>
							<li>Förluster: {tempHamster.defeats}</li>
							<li>Matcher: {tempHamster.games}</li>
						</ul>
					</li>
					<li>
						<HamsterCard hamster={tempHamster} />
						<ul>
							<li>Vinster: {tempHamster.wins}</li>
							<li>Förluster: {tempHamster.defeats}</li>
							<li>Matcher: {tempHamster.games}</li>
						</ul>
					</li>
					<li>
						<HamsterCard hamster={tempHamster} />
						<ul>
							<li>Vinster: {tempHamster.wins}</li>
							<li>Förluster: {tempHamster.defeats}</li>
							<li>Matcher: {tempHamster.games}</li>
						</ul>
					</li>
					<li>
						<HamsterCard hamster={tempHamster} />
						<ul>
							<li>Vinster: {tempHamster.wins}</li>
							<li>Förluster: {tempHamster.defeats}</li>
							<li>Matcher: {tempHamster.games}</li>
						</ul>
					</li>
					<li>
						<HamsterCard hamster={tempHamster} />
						<ul>
							<li>Vinster: {tempHamster.wins}</li>
							<li>Förluster: {tempHamster.defeats}</li>
							<li>Matcher: {tempHamster.games}</li>
						</ul>
					</li>
				</ol>
			</div>
		</section>
	);
}

export default StatisticsComp;
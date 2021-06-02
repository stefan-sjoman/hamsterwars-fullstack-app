import { Hamster } from "../../types/hamster-interface";
import HamsterCard from "../gallery/HamsterCard";

interface Props {
	winner: Hamster
	loser: Hamster
	setRunUseEffect: (runUseEffect:boolean) => void
	runUseEffect: boolean
}
const BattleResult = ({winner, loser, setRunUseEffect, runUseEffect}:Props) => {
	if(winner && loser) {
		return (
			<section className="battle-result">
				<h2>RESULTAT</h2>
				<section className="games-section">
					<div className="one-game">
						<div className="game-winner">
							<h3 className="games-header">VINNARE</h3>
							<HamsterCard hamster={winner}/>
							<dl>
								<dt>Vinster:</dt> <dd>{winner.wins}</dd>
								<dt>Förluster:</dt> <dd>{winner.defeats}</dd>
								<dt>Matcher:</dt> <dd>{winner.games}</dd>
							</dl>
						</div>
						<div className="vs-div">VS</div>
						<div className="game-loser">
							<h3 className="games-header">FÖRLORARE</h3>
							<HamsterCard hamster={loser}/>
							<dl>
								<dt>Vinster:</dt> <dd>{loser.wins}</dd>
								<dt>Förluster:</dt> <dd>{loser.defeats}</dd>
								<dt>Matcher:</dt> <dd>{loser.games}</dd>
							</dl>
						</div>
						<div className="to-battle-btn">
							<button className="basic-btn" onClick={() => setRunUseEffect(!runUseEffect)}>TÄVLA IGEN</button>
						</div>
					</div>
				</section>
			</section>
		)
	} else { return <div>Laddar hamstrar...</div> }
}

export default BattleResult;
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import './App.css';
import GalleryComp from './components/gallery/GalleryComp';
import BattleComp from './components/battle/BattleComp';
import StatisticsComp from './components/statistics/StatisticsComp';
import StartComp from './components/start/StartComp';
import HistoryComp from './components/history/HistoryComp';
import {allHamsters, runGetHamsters} from './atoms/atoms';
import ErrorComp from './components/error/ErrorComp';


function App() {

	const [hamsters, setHamsters] = useRecoilState(allHamsters); //useSetRecoilState
	const [contactDb, setContactDb] = useState(true);
	const [runUseEffect, setRunUseEffect] = useRecoilState(runGetHamsters);

	useEffect(() => {
		if (!runUseEffect) return;
		async function getHamsters() {
			const response = await fetch('/hamsters', {method: 'GET'});
			if (response.status !== 200) setContactDb(false);
			const data = await response.json();
			setHamsters(data);
		}
		getHamsters();
		setRunUseEffect(false);
		console.log("TA BORT" , hamsters); // HUR TA BORT??? useSetRecoilState
	}, [runUseEffect])

  	return (
		<Router>
		<div className="app">
			
			<header>
				<h1><Link to="/">HAMSTERWARS</Link></h1>
				<nav>
					<NavLink to="/battle" activeClassName="active-route">TÄVLA</NavLink>
					<NavLink to="/gallery" activeClassName="active-route">GALLERI</NavLink>
					<NavLink to="/statistics" activeClassName="active-route">STATISTIK</NavLink>
					<NavLink to="/history" activeClassName="active-route">HISTORIK</NavLink>
				</nav>
			</header>
			<main>
			{contactDb ? 
				<Switch>
					<Route path="/gallery"><GalleryComp /></Route>
					<Route path="/battle"><BattleComp /></Route>
					<Route path="/statistics"><StatisticsComp /></Route>
					<Route path="/history"><HistoryComp /></Route>
					<Route path="/"><StartComp /></Route>
				</Switch>
			:
				<ErrorComp />	
			}
			</main>
		</div>
		</Router>
  	);
}

export default App;
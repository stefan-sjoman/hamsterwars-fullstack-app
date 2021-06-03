import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import GalleryComp from './components/gallery/GalleryComp';
import BattleComp2 from './components/battle/BattleComp2';
import StatisticsComp from './components/statistics/StatisticsComp';
import StartComp from './components/start/StartComp';
import HistoryComp from './components/history/HistoryComp';
import {allHamsters, runGetHamsters} from './atoms/atoms';
import ErrorComp from './components/error/ErrorComp';
import './App.css';

function App() {

	const [hamsters, setHamsters] = useRecoilState(allHamsters);
	const [contactDb, setContactDb] = useState(true);
	const [runUseEffect, setRunUseEffect] = useRecoilState(runGetHamsters);

	useEffect(() => {
		if (!runUseEffect) return;
		async function getHamsters() {
			const response = await fetch('/hamsters', {method: 'GET'});
			if (response.status !== 200) {
				setContactDb(false);
			} else {
				setContactDb(true);
				const data = await response.json();
				sortHamsters(data);
				setHamsters(data);
			}
		}
		getHamsters();
		setRunUseEffect(false);
	}, [runUseEffect, hamsters, setHamsters, setRunUseEffect])

	function sortHamsters(data:any) {
		data.sort(function(a:any, b:any) {
			if (a.name < b.name) {
			  return -1;
			}
			if (a.name > b.name) {
			  return 1;
			}
			return 0;
		  });
		return data;
	}

  	return (
		<Router>
		<div className="app">
			<header>
				<h1><Link to="/">HAMSTERWARS</Link></h1>
				{contactDb ? 
				<nav>
					<NavLink to="/battle" activeClassName="active-route">TÄVLA</NavLink>
					<NavLink to="/gallery" activeClassName="active-route">GALLERI</NavLink>
					<NavLink to="/statistics" activeClassName="active-route">STATISTIK</NavLink>
					<NavLink to="/history" activeClassName="active-route">HISTORIK</NavLink>
				</nav>
				:
				null }
			</header>
			<main>
			{contactDb ? 
				<Switch>
					<Route path="/gallery"><GalleryComp /></Route>
					<Route path="/battle"><BattleComp2 /></Route>
					<Route path="/statistics"><StatisticsComp /></Route>
					<Route path="/history"><HistoryComp /></Route>
					<Route path="/"><StartComp /></Route>
				</Switch>
			:
				<ErrorComp runUseEffect={runUseEffect} setRunUseEffect={setRunUseEffect}/>	
			}
			</main>
		</div>
		</Router>
  	);
}

export default App;
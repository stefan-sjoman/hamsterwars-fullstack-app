import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import './App.css';
import GalleryComp from './components/gallery/GalleryComp';
import BattleComp from './components/battle/BattleComp';
import StatisticsComp from './components/statistics/StatisticsComp';
import allHamsters from './atoms/atoms';
import HistoryComp from './components/history/HistoryComp';

function App() {

	const [hamsters, setHamsters] = useRecoilState(allHamsters);
	useEffect(() => {
		async function getHamsters() {
			const response = await fetch('/hamsters', {method: 'GET'});
			const data = await response.json();
			setHamsters(data);
		}
		getHamsters();
		console.log("TA BORT" , hamsters);
		
	}, [])

  	return (
		<Router>
		<div className="app">
			<header>
				<nav>
					<h1><Link to="/">HAMSTERWARS</Link></h1>
					<NavLink to="/battle" activeClassName="active-route">TÄVLA</NavLink>
					<NavLink to="/gallery" activeClassName="active-route">GALLERI</NavLink>
					<NavLink to="/statistics" activeClassName="active-route">STATISTIK</NavLink>
					<NavLink to="/history" activeClassName="active-route">HISTORIK</NavLink>
				</nav>
			</header>
			<main>
			<Switch>
				<Route path="/gallery"><GalleryComp /></Route>
				<Route path="/battle"><BattleComp /></Route>
				<Route path="/statistics"><StatisticsComp /></Route>
				<Route path="/history"><HistoryComp /></Route>
			</Switch>
			</main>
		</div>
		</Router>
  	);
}

export default App;
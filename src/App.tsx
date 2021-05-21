import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './App.css';

function App() {
  return (
	<Router>
	<div className="app">
		<header>
			<nav>
				<h1><Link to="/">HAMSTERWARS</Link></h1>
				<Link to="/enannan">En Annan</Link>
				<Link to="/entredje">En Tredje</Link>
			</nav>
		</header>
		<main>
		<Switch>
			<Route path="/entredje">En tredje</Route>
			<Route path="/enannan">En annan</Route>
			<Route path="/">HEJSAN</Route>
		</Switch>
		</main>
	</div>
	</Router>
  );
}

export default App;

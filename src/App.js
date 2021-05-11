import React from "react";
import "./App.css";
import Loans from "./app/loans/Loans";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route
						path='/home'
						render={() => <h1>boss-admin-ui home</h1>}
					/>
					<Route path='/loans' render={() => <Loans />} />
					<Redirect to='/home' />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

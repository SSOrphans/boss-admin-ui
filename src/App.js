import React from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import {ViewAccountComponent} from "./app/features";

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route
						path='/home'
						render={() => <h1>boss-admin-ui home</h1>}
					/>
					<Route
						path='/loans'
						render={() => <h1>boss-admin-ui loan</h1>}
					/>
					<Route
						path='/accounts/:id'
						component={ViewAccountComponent}
					/>
					<Redirect to='/home' />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

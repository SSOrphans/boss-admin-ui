import React from "react";
import "./App.css";
import LoansTable from "./app/features/loans/component/Loans";
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
					<Route path='/loans' render={() => <LoansTable />} />
					<Redirect to='/home' />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

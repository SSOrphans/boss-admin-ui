import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { CardDetail } from "./app/features/cards/components/cardDetail";
import { CardCreate } from "./app/features/cards/components/cardCreate";

function App() {
  return (
    <div className="App m-5">
      <Router>
        <Switch>
          <Route path="/home" render={() => <h1>boss-admin-ui home</h1>} />
          <Route path="/loans" render={() => <h1>boss-admin-ui loan</h1>} />
          <Route exact path="/cards/add" component={CardCreate} />
          <Route exact path="/cards/:cardId" component={CardDetail} />
          <Redirect to="/home" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

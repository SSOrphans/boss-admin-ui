import React from "react";
import "./App.css";
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import LoansTable from "./app/features/loans/component/Loans";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import {ViewAccountComponent, ViewAccountListComponent} from "./app/features";
import {CardCreate} from "./app/features/cards/components/card-create";
import {CardDetail} from "./app/features/cards/components/card-detail";
import {LandingComponent} from "./app/features/home/components/LandingComponent";
import {NavBarComponent} from "./app/features/shared/components/NavBarComponent";
import { CardListComponent } from "./app/features/cards/components/card-list";

function App() {
  return (
    <div className="bg">
      <NavBarComponent/>
      <div className="App m-5">
        <Router>
          <Switch>
            <Route path="/home" component={LandingComponent}/>
            <Route path="/loans" render={() => <LoansTable/>}/>
            <Route exact path="/cards" component={CardListComponent}/>
            <Route exact path="/cards/add" component={CardCreate}/>
            <Route exact path="/cards/:cardId" component={CardDetail}/>
            <Route exact path='/accounts' component={ViewAccountListComponent}/>
            <Route path='/accounts/:id' component={ViewAccountComponent}/>
            <Redirect to="/home"/>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;

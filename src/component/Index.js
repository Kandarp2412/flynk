import React from 'react';
import ReactDOM from 'react-dom';
import Assets from './Assets';
import Location from './Location';
import NewAsset from './NewAsset';
import NewLocation from './NewLocation';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Index() {
    return (
        <div className="container">
           
           <Router>
      <Switch>
      <Route exact path="/">
          <Assets />
        </Route>
        <Route exact path="/asset/create">
          <NewAsset />
        </Route>
        <Route exact path="/asset" component={Assets}>
          {/* <Assets /> */}
        </Route>
        <Route path="/location">
          <Location />
        </Route>
        <Route path="/location/create">
          <NewLocation />
        </Route>
      </Switch>
    </Router>
        </div>
    );
}

export default Index;


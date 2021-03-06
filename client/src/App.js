import React, { Fragment } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//components
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";

//render instead of component, we don't want props to remount
function App() {
  return (
      <Fragment>
        <Router>
          <div className="container">
          <Switch>
            <Route exact path="/login" render={props => <Login {...props} /> } />
            <Route exact path="/register" render={props => <Register {...props} /> } />
            <Route exact path="/dashboard" render={props => <Dashboard {...props} /> } />
          </Switch>
          </div>
        </Router>
      </Fragment>
  );
}

export default App;

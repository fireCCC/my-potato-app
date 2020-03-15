import * as React from 'react';
import history from './config/history'
import './App.scss';

// import logo from './logo.svg';
import { Router, Route } from "react-router-dom";
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Index from './components/Index/Index';



class App extends React.Component {
  public render() {
    return (
      <Router history={history}>
        <Route exact={true} path="/" component={Index} />
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={SignUp} />
      </Router>
    );
  }
}

export default App;

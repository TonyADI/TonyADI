import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Account } from '../../pages/Account/Account';
import { Authenticate } from '../Authenticate/Authenticate';
import { Browse } from '../../pages/Browse/Browse';
import { Footer } from '../Footer/Footer';
import { Home } from '../../pages/Home/Home';
import { Landing } from '../../pages/Landing/Landing';
import { Navbar } from '../Navbar/Navbar';
import { NotFound } from '../../pages/NotFound/NotFound';
import { Sell } from '../../pages/Sell/Sell';
import { retrieveData } from '../../utilities/projectAPI';
import './App.css';


const App = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const verifyAuthentication = () => {
    retrieveData('https://localhost:3000/verify-authentication').then(data => {
      if(data){
        setAuthenticated(true);
      }
      console.log('User is not logged in')
    })
  }
  useEffect(() => {
    verifyAuthentication();
  }, []);
  
  return (
    <Router>
      <div id="app-body">
        <Navbar authenticated={authenticated}/>
        <Switch>
          <Route path="/browse">
              <Browse authenticated={authenticated}/>
          </Route>
          <Route path="/sell">
              <Sell authenticated={authenticated}/>
          </Route>
          <Route path="/register">
              {!authenticated ? 
              <Authenticate type='Register' setAuthenticated={setAuthenticated}/>: 
              <Redirect to="/" />}
          </Route>
          <Route path="/login">
              {!authenticated ? 
              <Authenticate type='Login' setAuthenticated={setAuthenticated}/> : 
              <Redirect to="/" />}
          </Route>
          <Route path="/account">
              {authenticated ? 
              <Account authenticated={authenticated} setAuthenticated={setAuthenticated}/> : 
              <Redirect to="/login" />}
          </Route>
          <Route path="/made-for-you">
              <Landing />
          </Route>
          <Route exact path="/">
              <Home authenticated={authenticated}/>
          </Route>
          <Route component={NotFound}/>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

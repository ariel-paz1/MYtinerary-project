import React from 'react';
import './App.css';
import SideNavPage from './components/Nav/Nav';
//import Gallery from './components/Gallery/galeria';
import CarouselPage from './components/Gallery/galeria';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NewUser from './components/CreateUser';
import Users from './components/Login';
import Ciudades from './components/Cities';
/*
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
const bootstrap = require('bootstrap');
console.log(bootstrap)

*/

function App() {
  return (
    <div className="App cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <BrowserRouter>
        <div className="Nav">
          <React.Fragment>
            <SideNavPage />
          </React.Fragment>
        </div>
        <header className="mb-auto" >
        <Link to="/"><img src={process.env.PUBLIC_URL + '/img/MYtineraryLogo.png'} className="App-logo" alt="logo" />
        </Link>
        </header>
        <Switch>
          <Route path="/Cities">
            <Cities />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Create">
            <Create />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>

  );
}

function Home() {
  return (
    <footer className="mt-auto">
      <div className="IrCiudades">
        <p>Find your perfect trip, designed by insiders who know
        and love their cities
        </p>
        
        <Link to="/Cities"><img src={process.env.PUBLIC_URL + '/img/circled-right-2.png'} className="browse-logo" alt="logo" /></Link>
        
      </div>
      <p className="text-left">
        Popular MYtineraries
      </p>
      <React.Fragment>
        <CarouselPage />
      </React.Fragment>
    </footer>
  );
}

function Create() {
  return (
    <React.Fragment>
    <NewUser />
    </React.Fragment>
  );
}

function Login() {
  return (
    <React.Fragment>
    <Users />
    </React.Fragment>
  );
}

function Cities() {
  return (
    <React.Fragment>
    <Ciudades />
    </React.Fragment>
  );
}

export default App;

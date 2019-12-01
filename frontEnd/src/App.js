import React from "react";
import "./App.css";
import SideNavPage from "./components/Nav/Nav";
//import Gallery from './components/Gallery/galeria';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import NewUser from "./components/CreateUser";
import Users from "./components/Login";
import Ciudades from "./components/Cities";
import Itinerario from "./components/Itinerary";
import Home from "./components/Home";
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
        <header className="mb-auto">
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/img/MYtineraryLogo.png"}
              className="App-logo"
              alt="logo"
            />
          </Link>
        </header>
        <Switch>
          <Route path="/Cities" component={Ciudades}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route path="/Create" component={NewUser}></Route>
          <Route path="/Login" component={Users}></Route>
          <Route path="/Itinerary/:id" component={Itinerario}></Route>
        </Switch>
        {/* <Route path="/Itinerary/:id">            <Itineraries />          </Route> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

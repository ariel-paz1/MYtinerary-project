import React, { Component } from "react";
import "./App.css";
import SideNavPage from "./components/Nav/Nav";
//import Gallery from './components/Gallery/galeria';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import NewUser from "./components/Usuario/CreateUser";
import Login from "./components/Usuario/Login";
import Ciudades from "./components/Cities";
import Itinerario from "./components/Itinerary";
import Home from "./components/Home";
import store from './store';
import { loadUser } from './actions/authActions';

/*
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
const bootstrap = require('bootstrap');
console.log(bootstrap)

*/

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
  
  return (
    <div className="App cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <BrowserRouter>
        <div className="Nav mb-5">
          <React.Fragment>
            <SideNavPage />
          </React.Fragment>
        </div>
        <Switch>
          <Route path="/Cities" component={Ciudades}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route path="/Create" component={NewUser}></Route>
          <Route path="/Login" component={Login}></Route>
          <Route path="/Itinerary/:id" component={Itinerario}></Route>
          
        </Switch>
      
      <footer className="mt-auto">
      <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/img/homeIcon.png"}
              className="Home-ico"
              alt="logo"
            />
          </Link>
      </footer>
      </BrowserRouter>
    </div>
  );
}
}
export default App;

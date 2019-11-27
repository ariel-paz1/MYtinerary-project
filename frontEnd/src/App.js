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
import Itinerario from './components/Itinerary';
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
        <Route path="/Itinerary">
            <Itineraries />
          </Route>
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

function Itineraries() {

  return (
    
    <React.Fragment>
    <Itinerario />
    </React.Fragment>
    
  );
}

export default App;
/*
import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default App;*/
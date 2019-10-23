import React from 'react';
import './App.css';
import Routes from './routes';
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
      <header className="mb-auto mt-5" >
        <img src={process.env.PUBLIC_URL + '/img/MYtineraryLogo.png'} className="App-logo" alt="logo" />
      </header>
      <div>
        <p>Find your perfect trip, designed by insiders who know
            and love their cities
        </p>
        <div className="mt-5 mb-5">
          <h2>Start browsing</h2>
          <img src={process.env.PUBLIC_URL + '/img/circled-right-2.png'} className="browse-logo" alt="logo" />
        </div>
        <p>
          Want to build your own MYtinerary?
        </p>
        <div className="row text-center">
          <div className="col">
            <a>Log in</a>
          
          </div>
          <div className="col">
            <a>Create Account</a>
          </div>
        </div>
      </div>
      <footer className="mt-auto">
        <img src={process.env.PUBLIC_URL + '/img/homeIcon.png'} className="Home-ico inactivo" alt="logo" />
      </footer>
    </div>
  );
}

export default App;

//<Routes />
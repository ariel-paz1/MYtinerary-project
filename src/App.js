import React from 'react';
import './App.css';
import Routes from './routes';
import SideNavPage from './components/Nav/Nav';
//import Gallery from './components/Gallery/galeria';
import CarouselPage from './components/Gallery/galeria';

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
      <div className="Nav">
        <React.Fragment>
          <SideNavPage />
        </React.Fragment>
      </div>
      <header className="mb-auto" >
        <img src={process.env.PUBLIC_URL + '/img/MYtineraryLogo.png'} className="App-logo" alt="logo" />
      </header>
      <div>
        <p>Find your perfect trip, designed by insiders who know
            and love their cities
        </p>
        <div >
          <img src={process.env.PUBLIC_URL + '/img/circled-right-2.png'} className="browse-logo" alt="logo" />
        </div>
      </div>
      <footer className="mt-auto">
        <p className="text-left">
          Popular MYtineraries
        </p>
        <React.Fragment>
          <CarouselPage />
        </React.Fragment>
      </footer>
    </div>
  );
}

export default App;

//<Routes />
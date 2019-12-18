import React from "react";
import { Link } from "react-router-dom";
import CarouselPage from "./Gallery/galeria";
class Home extends React.Component {
  render() {
    return (
      <header className="mb-auto">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/img/MYtineraryLogo.png"}
            className="App-logo"
            alt="logo"
          />
        </Link>
        <div className="IrCiudades">
          <p>
            Find your perfect trip, designed by insiders who know and love their
            cities
          </p>

          <Link to="/Cities">
            <img
              src={process.env.PUBLIC_URL + "/img/circled-right-2.png"}
              className="browse-logo"
              alt="logo"
            />
          </Link>
        </div>
        <p className="text-left">Popular MYtineraries</p>
        <React.Fragment>
          <CarouselPage />
        </React.Fragment>
      </header>
    );
  }
}
export default Home
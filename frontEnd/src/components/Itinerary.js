import React from "react";
import { connect } from "react-redux";
import { getItinerary, deleteItinerary } from "../actions/itineraryAction";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import Activity from "./Activity";
import axios from "axios";
class Itinerario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itinerarioData: [],
      favorite: [],
      act: false
    };
  }

  componentDidMount() {
    const name = this.props.match.params.id;
    this.props.getItinerary(name);
  }

  onDeleteClick = id => {
    this.props.deleteItinerary(id);
  };

  toggle = () => {
    this.setState({
      act: !this.state.act
    });
  };

  manageFavorites = iti => {
    var joined = this.state.favorite.concat(iti);
    let newArray = this.state.favorite;
    if (newArray.includes(iti)) {
      let filteredArray = this.state.favorite.filter(item => item !== iti)
      console.log("filteredArray");
      console.log(filteredArray);
      this.setState({ favorite: filteredArray });
    }
    else this.setState({ favorite: joined });
  }

  addFavorites = (id) => {
    //e.preventDefault();
    const favorites = this.state.favorite;
    //console.log(favorites);
    axios.put(`http://localhost:5000/usuarios/${id}`, favorites).then(res => {
      console.log("res");
      console.log(res);
    }).catch(err => {
      console.log("err");
      console.log(err);
    });
  }

  isFavorite = iti => {
    let newArray = this.state.favorite;
    if (newArray.includes(iti)) {
      return true
    }
    else return false
  }

  render() {
    if (this.props.itinerario.itinerarioData) {
      const dat = this.props.itinerario.itinerarioData;
      //const { itinerario } = this.props.itinerario;
      console.log(this);
      return (
        <React.Fragment>
          <div>
            {this.props.itinerario.itinerarioData[0] ? (
              <h1>{this.props.itinerario.itinerarioData[0].citi_id.name} </h1>
            ) : (
                null
              )}
            {this.props.isAuthenticated ? (
              null
            ) : (
                <h4 className="mb-3 ml-4">Please log in to manage Itineraries</h4>
              )}
            {dat.map(dat => (
              <div className="card mb-3 " key={dat._id}>
                <div className="mb-3" >
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src={process.env.PUBLIC_URL + "/img/itin/" + dat.profilePic}
                        className="imgCard"
                        alt="..."
                      />
                      <h6 className="card-title">{dat.userName}</h6>
                    </div>
                    <div className="col-md-8 align-self-center">
                      <div className="card-body">
                        <h5 className="card-title">{dat.title}</h5>
                        <h6 className="card-title">
                          Rating: {dat.rating} Price: {dat.price}
                        </h6>
                        <p className="card-text" onClick={this.toggle}>
                          <small className="text-muted">See more</small>
                        </p>
                        {this.props.isAuthenticated ? (
                          <Button
                            color={this.isFavorite(dat.title) ? "green" : "red"}
                            onClick={() => this.manageFavorites(dat.title)}
                          >
                            Favorite
                      </Button>
                        ) : null}
                      </div>
                    </div>
                  </div>

                </div>
                {(this.state.act) ? (
                  <React.Fragment>
                    <Activity />
                  </React.Fragment>
                ) :
                  null
                }
              </div>
            ))}

            {this.props.isAuthenticated ? (
              <Button
                onClick={this.addFavorites(this.props.user.id)}
              >
                Actualizar Usuario
                      </Button>
            ) : null}
          </div>
        </React.Fragment>
      );
    }
  }
}

Itinerario.propTypes = {
  getItinerary: PropTypes.func.isRequired,
  itinerario: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    itinerario: state.itinerary,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { getItinerary, deleteItinerary })(
  Itinerario
);
/**
*
            <Button
              color="dark"
              style={{ marginBottom: "2rem" }}
              onClick={this.toggle}
            >
              Agregar itinerario
            </Button>
*
*/

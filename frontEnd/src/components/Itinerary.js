import React from 'react';
import { connect } from "react-redux";
import { getItinerary, deleteItinerary } from "../actions/itineraryAction";
import PropTypes from "prop-types";
import { Button } from 'reactstrap';
class Itinerario extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itinerarioData: [],
      favorite: []
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
      itinerarioData: this.state.itinerarioData
    });
  };

  manageFavorites() {

  };
  /*
    administrarFoto = iti => {
      if(iti.profilePic) return process.env.PUBLIC_URL + "/img/" + iti.profilePic
      else return process.env.PUBLIC_URL + "/img/userPred.png"
  
    };
  */
  render() {
    const dat = this.props.itinerario.itinerarioData;
    console.log(this);

    //const { itinerario } = this.props.itinerario;
    let btn_class = "white";

    return (
      <React.Fragment>
        <div>
          <h1>{dat.name}</h1>
          {this.props.isAuthenticated ? (
            <Button
              color='dark'
              style={{ marginBottom: '2rem' }}
              onClick={this.toggle}
            >
              Agregar itinerario
          </Button>
          ) : (
              <h4 className='mb-3 ml-4'>Please log in to manage Itineraries</h4>
            )}
          {dat.map(dat => (
            <div className="card mb-3" key={dat._id}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={process.env.PUBLIC_URL + "/img/itin/" + dat.profilePic} className="imgCard" alt="..." />
                  <h6 className="card-title">{dat.userName}</h6>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{dat.title}</h5>
                    <h6 className="card-title">Rating: {dat.rating} Price: {dat.price}</h6>
                    <p className="card-text"><small className="text-muted">See more</small></p>
                    {this.props.isAuthenticated ? (
                      <Button color={btn_class} onClick={this.manageFavorites.bind(this)}>Favorite</Button>
                    ) : (null)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
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
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, { getItinerary, deleteItinerary })(Itinerario);
        /**
*
<table className="table">
<thead>
<tr>

<th scope="col">profilePic</th>
<th scope="col">Favorite</th>
</tr>
</thead>
<tbody>
<tr key={dat.name}>

<td>{dat.profilePic}</td>
<td>
{this.props.isAuthenticated ? (
<Button color={btn_class} onClick={this.manageFavorites.bind(this)}>Favorite</Button>
) : (<Button color="red" >Login</Button>)}
</td>
</tr>
</tbody>
</table>

*
*/
import React from "react";
import { connect } from "react-redux";
import { getItinerary } from "../actions/itineraryAction";
import PropTypes from "prop-types";

class Itinerario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itinerarioData: [],
      search: ""
    };
  }

  componentDidMount() {
    const name = this.props.match.params.id;
    fetch(`http://localhost:5000/itinerario/${name}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          itinerarioData: data
        });
      });
  }

  render() {
    const dat = this.state.itinerarioData;
    
    return (
      <React.Fragment>
        <div>
          <h1>{dat.title}</h1>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">profilePic</th>
              </tr>
            </thead>
            <tbody>
              <tr key={dat.name}>
                <td>{dat.name}</td>
                <td>{dat.profilePic}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

Itinerario.propTypes = {
  getItinerary: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    item: state.item
  };
};

export default connect(mapStateToProps, { getItinerary })(Itinerario);

import React from "react";
import { connect } from "react-redux";
import { getItinerary } from "../actions/itemActions";
import PropTypes from "prop-types";
class Itinerario extends React.Component {
  /*
componentDidMount() {
  // calling the new action creator
  this.props.getItems();
}
*/
  

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      search:''
    };
  }

  componentDidMount() {
    console.log("this");
    console.log(this);
    fetch("http://localhost:5000/itinerario")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ 
          products: data
        });
      });
  }

updateSearch(event){
  this.setState({
    search: event.target.value.substr(0,20)
  });
}

  render() {
    let filtered = this.state.products.filter(
      (ciudades) => {
        return ciudades.name.indexOf(this.state.search) !== -1;
      }
    );
    return (
      <React.Fragment>
        <h1>Itinerario</h1>
        <form>
        <label htmlFor="filter">Buscar: </label>
        <input type="text" id="filter" 
          value={this.state.search} 
          onChange={this.updateSearch.bind(this)}/>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Pais</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(dat => (
              <tr key={dat.title}>
                <td>{dat._id}</td>
                <td>{dat.title}</td>
                <td>{dat.profilePic}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
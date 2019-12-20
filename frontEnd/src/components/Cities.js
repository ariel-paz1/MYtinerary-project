import React from "react";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
class Ciudades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      search: ""
    };
  }

  componentDidMount() {
    this.props.getItems();
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 20)
    });
  }

  render() {
    let filtered = this.props.item.items.filter(ciudades => {
      return ciudades.name.indexOf(this.state.search) !== -1;
    });


    return (
      <React.Fragment>
        <h1>Ciudades</h1>
        <form>
          <label htmlFor="filter">Buscar: </label>
          <input
            type="text"
            id="filter"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Pais</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(dat => (
              <tr key={dat.name}>
                <td><Link to={`Itinerary/${dat._id}`}>{dat.name}</Link></td>
                <td>{dat.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

Ciudades.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    item: state.item
  };
};
export default connect(mapStateToProps, { getItems })(Ciudades);


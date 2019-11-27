import React from "react";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
class Ciudades extends React.Component {
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
      search: ""
    };
  }

  componentDidMount() {
    console.log("this");
    console.log(this);
    fetch("http://localhost:5000/city")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          products: data
        });
      });
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 20)
    });
  }

  render() {
    let filtered = this.state.products.filter(ciudades => {
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
                <td><Link to={`Itinerary/${dat.name}`}>{dat.name}</Link></td>
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
  console.log(state);
  return {
    item: state.item
  };
};
export default connect(mapStateToProps, { getItems })(Ciudades);

/*
codigo funcionando
        <div>
          <ul>
            {this.state.cities.length <= 0
              ? 'NO DB ENTRIES YET'
              : this.state.cities.map((dat) => (
                <li style={{ padding: '10px' }} key={dat.name}>
                  <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                  <span style={{ color: 'gray' }}> cities: </span>
                  {dat.name}
                  <span style={{ color: 'gray' }}> country: </span>
                  {dat.country}
                </li>
              ))}
          </ul>
        </div>


          <tbody>
            <NumberList numbers={numbers} />
          </tbody>

*/

import React from 'react'

class Ciudades extends React.Component {

  state = {
    cities: [],
    id: 0,
    intervalIsSet: false
  };

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch('/city')
      .then(res => res.json())
      .then(cities => this.setState({ cities }));
  };

  render() {
    return (
      <React.Fragment>
        <h1>Ciudades</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Pais</th>
            </tr>
          </thead>
          <tbody>
            { this.state.cities.map((dat) => (
              <tr key={dat.name}>
                <td>{dat._id}</td>
                <td>{dat.name}</td>
                <td>{dat.country}</td>
              </tr>
              ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}


export default Ciudades

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

esto no funciona 

function NumberList(props) {
  const ciudades = props.ciudades;
  const listItems = ciudades.map((ciudad) =>
    <ListItem key={ciudad}
      value={ciudad} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

function ListItem(props) {
  return <tr><td>{props.name}</td></tr>;
}
*/
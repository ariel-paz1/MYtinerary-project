import React from "react";
import { connect } from "react-redux";
import { getActivity } from "../actions/activityAction";
import PropTypes from "prop-types";

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityData: [],
      search: ""
    };
  }

  componentDidMount() {
    
    fetch(`http://localhost:5000/actividades/all`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
            activityData: data
        });
      });
  }

  render() {
    const dat = this.state.activityData;
    
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
                <td>{dat.pic}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

Activity.propTypes = {
  getActivity: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    item: state.item
  };
};

export default connect(mapStateToProps, { getActivity })(Activity);

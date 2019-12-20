import React from 'react';
import './nav-style.css';
import {
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

class SideNavPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      state: {
        showNav: false
      },
      modal: false,
      userName: "",
      password: ""
    };
  }

  openNavClick = e => {
    e.preventDefault()
    this.openNav()
  }

  closeNavClick = e => {
    e.preventDefault()
    this.closeNav()
  }

  openNav = () => {
    this.setState({
      showNav: true
    })

    document.addEventListener("keydown", this.handleEscKey)
  }
  closeNav = () => {
    this.setState({
      showNav: false
    })

    document.removeEventListener("keydown", this.handleEscKey)
  }

  handleEscKey = e => {
    if (e.key === "Escape") {
      this.closeNav()
    }
  }


  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
    
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };


  render() {
    const { showNav } = this.state
    let navCoverStyle = { width: showNav ? "100%" : "0" }
    let sideNavStyle = { width: showNav ? "250px" : "0" }

    return (
      <React.Fragment>
        <span className="user-side">
          <img src={process.env.PUBLIC_URL + '/img/userPred.png'} className="user-img" alt="logo" />
        </span>
        <span onClick={this.openNavClick} className="open-nav">
          &#9776;
        </span>
        <div
          onClick={this.navCoverClick}
          className="nav-cover"
          style={navCoverStyle}
        />
        <div name="side-nav" className="side-nav" style={sideNavStyle}>
          <a href="/#" onClick={this.closeNavClick} className="close-nav">
            &times;
          </a>

          <div>
            <Link to="/" onClick={this.closeNav} >Home</Link>
            {this.props.isAuthenticated ? (
              <a href="/" onClick={this.props.logout}>Logout</a>
            ) : (
              <div>
              <Link to="/Create" onClick={this.closeNav}>Create</Link>
              <Link to="/Login" onClick={this.closeNav}>Login</Link>
            </div>
            )} 
            <hr />
          </div>

        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { logout }
)(SideNavPage);

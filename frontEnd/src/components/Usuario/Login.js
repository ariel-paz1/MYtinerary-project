import React from "react";
import axios from "axios";
//import { GoogleLogin } from "react-google-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      userName: "",
      password: "",
      badLogin: false
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
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

    if (this.props.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  iniciarSesionGoogle = e => {
    e.preventDefault();

    /*axios.post("http://localhost:5000//login/google/usr", usuario).then(res => {
      console.log("res");
      console.log(res);
    }).catch( err => {
      this.setState({ badLogin: true });
    });*/
  };

  handleChange(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  iniciarSesion = e => {
    e.preventDefault();
    const usuario = this.state;
    // Ojo deberia ser con login(usuario), no con el post de abajo!
    axios.post("http://localhost:5000/login", usuario).then(res => {
      console.log("res");
      console.log(res);
    }).catch(err => {
      this.setState({ badLogin: true });
    });
    this.props.login(usuario);
    console.log(this);
  };

  render() {
    return (
      <React.Fragment>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first">
              <h3>Ingreso</h3>
            </div>
            <form method="post">
              <input
                type="text"
                id="login"
                className="fadeIn second"
                name="userName"
                placeholder="Usuario"

                onChange={this.handleChange.bind(this)}
              ></input>
              <input
                type="password"
                id="password"
                className="fadeIn third"
                name="password"
                placeholder="Contraseña"

                onChange={this.handleChange.bind(this)}
              ></input>
              <button type="button" className="btn btn-outline-success"
                id="submit_button"
                onClick={this.iniciarSesion}
              >
                Sign In
              </button>
              <div>
                {this.state.badLogin &&
                  <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    Oops Something is wrong!!
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">

                    </button>
                  </div>}
              </div>
            </form>
            <div id="formFooter">
              <a className="underlineHover" href="/Create">
                Nuevo Usuario?
              </a>
              
            </div>
            <GoogleLoginButton onClick={this.iniciarSesionGoogle} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login);

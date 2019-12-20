import React from "react";
//import axios from "axios";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      email: "",
      name: "",
      country: "",
      favorites:[],
      image: null,
      checked: false
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
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

  /* Archivos */
  fileSelectedHandler = event => {
    this.setState({
      image: event.target.files[0]
    });
  };

  fileUploadHandler = (e) => {
    e.preventDefault();
    //const fd = new FormData();
    const usuario = this.state;
    usuario.image = "imagen_test";
    // fd.append("image", this.state.image, this.state.image.name);
    this.props.register(usuario);
  };

  /*  Actualizacion de state  */
  handleChange(e) {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  handleCheckChange = evt => {
    this.setState({ checked: evt.target.checked });
  };

  /* Validacion */
  canBeSubmitted() {
    const { email, password, userName, checked } = this.state;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!userName) {
      formIsValid = false;
      errors["userName"] = "Cannot be empty";
    }

    if (typeof userName !== "undefined") {
      if (!userName.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["name"] = "Only letters";
      }
    }

    //password
    if (!password) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }

    //checked
    if (!checked) {
      formIsValid = false;
      errors["checked"] = "Cannot be empty";
    }

    //Email
    if (!email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof email !== "undefined") {
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }
    console.log(errors);
    return formIsValid;
  }

  render() {
    const isEnabled = this.canBeSubmitted();
    return (
      <React.Fragment>
        <h1>Nuevo Usuario</h1>
        <form method="POST">
          <input
            style={{ display: "none" }}
            type="file"
            onChange={this.fileSelectedHandler}
            ref={fileInput => (this.fileInput = fileInput)}
            name="image"
          ></input>
          <img
            src={process.env.PUBLIC_URL + "/img/userPred.png"}
            onClick={() => this.fileInput.click()}
            alt=""
          />
          <input
            type="text"
            id="userName"
            className="fadeIn second"
            name="userName"
            placeholder="Usuario"
            value={this.state.userName}
            onChange={this.handleChange.bind(this)}
          ></input>
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="Contraseña"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
          ></input>
          <input
            type="text"
            id="email"
            className="fadeIn second"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange.bind(this)}
          ></input>
          <input
            type="text"
            id="name"
            className="fadeIn third"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange.bind(this)}
          ></input>
          <label>
            Nacionalidad:
            <select
              name="country"
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            >
              <option value="England">Elegir Pais</option>
              <option value="England">England</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="Holland">Holland</option>
            </select>
          </label>
          <br></br>
          <input
            type="checkbox"
            id="byc"
            name="checked"
            value={this.state.checked}
            onChange={this.handleCheckChange}
          ></input>
          Acepto Bases y Condiciones
          <br></br>
          <button
            type="button" className="btn btn-outline-success btnLog"
            id="submit_button"
            onClick={this.fileUploadHandler}
            disabled={!isEnabled}
          >
            Sign Up
          </button>
        </form>
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
  { register, clearErrors }
)(NewUser);

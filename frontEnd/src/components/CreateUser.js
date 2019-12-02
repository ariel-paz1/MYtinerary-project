import React from "react";
import axios from "axios";

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      name: "",
      country: "",
      image: null,
      checked: false
    };
  }
  /* Archivos */
  fileSelectedHandler = event => {
    this.setState({
      image: event.target.files[0]
    });
  };

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", this.state.image, this.state.image.name);
    axios
      .post("http://localhost:5000/usuarios", fd, {
        onUploadProgress: progressEvent => {
          console.log(
            "Upload: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        }
      })
      .then(res => {
        console.log(res);
      });
  };



  /*  Actualizacion de state  */
  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
  };

  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };

  handleUserNameChange = evt => {
    this.setState({ username: evt.target.value });
  };

  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
  };

  handleCheckChange = evt => {
    this.setState({ checked: evt.target.checked });
  };

  /* Validacion */
  canBeSubmitted() {
    const { email, password, username, name, checked } = this.state;
    return (
      email.length > 0 &&
      password.length > 0 &&
      username.length > 0 &&
      name.length > 0 &&
      checked === true
    );
  }

  render() {
    const isEnabled = this.canBeSubmitted();
    return (
      <React.Fragment>
        <h1>Nuevo Usuario</h1>
        <form onSubmit={this.handleSubmit} action="/usuarios">
          <input
            style={{ display: "none" }}
            type="file"
            onChange={this.fileSelectedHandler}
            ref={fileInput => (this.fileInput = fileInput)}
          ></input>
          <img
            src={process.env.PUBLIC_URL + "/img/userPred.png"}
            onClick={() => this.fileInput.click()}
            alt=""
          />
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Usuario"
            value={this.state.username}
            onChange={this.handleUserNameChange}
          ></input>
          <input
            type="text"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="Contraseña"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          ></input>
          <input
            type="text"
            id="email"
            className="fadeIn second"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          ></input>
          <input
            type="text"
            id="name"
            className="fadeIn third"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleNameChange}
          ></input>
          <label>
            Nacionalidad:
            <select value={this.state.value} onChange={this.handleChange}>
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
            value={this.state.checked}
            onChange={this.handleCheckChange}
          ></input>
          Acepto Bases y Condiciones
          <br></br>
          <button
            type="submit"
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
export default NewUser;

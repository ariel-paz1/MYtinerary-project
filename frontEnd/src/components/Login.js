import React from 'react'
class Users extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first">
              <h3>Ingreso</h3>
            </div>
            <form>
              <input type="text" id="login" className="fadeIn second" name="login" placeholder="Usuario"></input>
              <input type="text" id="password" className="fadeIn third" name="login" placeholder="Contraseña"></input>
              <input type="submit" className="fadeIn fourth" value="Log In"></input>
            </form>
            <div id="formFooter">
              <a className="underlineHover" href="#">Nuevo Usuario?</a>
            </div>
          </div>
        </div>
      </React.Fragment>
            );
          }
        }
export default Users
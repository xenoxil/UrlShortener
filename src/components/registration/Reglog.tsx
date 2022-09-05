import React, { useRef } from 'react';
/*import { FormValidator } from '../FormValidator';
import { loginConfig } from '../../utils/constants';
import Notification from '../Notification/Notification';*/

function Reglog() {
  const email = useRef();
  const password = useRef();

  /* React.useEffect(() => {
    const loginForm = document.getElementById('loginForm');
    const loginFormValidation = new FormValidator(loginConfig, loginForm);
    loginFormValidation.enableValidation();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email.current.value, password.current.value);
  }
*/
  return (
    <section className="section__reglog">
      <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
      <label htmlFor="reg-log"></label>
      <div className="card-3d-wrap">
        <div className="card-3d-wrapper">
          <div className="card-front">
            <div className="center-wrap">
              <form className="reglog__form">
                <h4 className="reglog__formHeader">Log In</h4>
                <div className="reglog__inputContainer">
                  <input
                    type="email"
                    name="logemail"
                    className="form-input"
                    placeholder="Your Email"
                    id="logemail"
                    autoComplete="off"
                  />
                  <input
                    type="password"
                    name="logpass"
                    className="form-input"
                    placeholder="Your Password"
                    id="logpass"
                    autoComplete="off"
                  />
                </div>
                <button className="reglog__submitBtn">submit</button>
              </form>
            </div>
          </div>
          <div className="card-back">
            <div className="center-wrap">
              <form className="reglog__form">
                <h4 className="reglog__formHeader">Sign Up</h4>
                <div className="reglog__inputContainer">
                  <input
                    type="email"
                    name="logemail"
                    className="form-input"
                    placeholder="Your Email"
                    id="logemail"
                    autoComplete="off"
                  />
                  <input
                    type="password"
                    name="logpass"
                    className="form-input"
                    placeholder="Your Password"
                    id="logpass"
                    autoComplete="off"
                  />
                </div>
                <button className="reglog__submitBtn">submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reglog;

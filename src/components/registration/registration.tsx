import React, { useRef } from 'react';
/*import { FormValidator } from '../FormValidator';
import { loginConfig } from '../../utils/constants';
import Notification from '../Notification/Notification';*/

function Login() {
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
      <h6>
        <span className="reglog__pointer">Log In </span>
        <span className="reglog__pointer">Sign Up</span>
      </h6>
      <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
      <label htmlFor="reg-log"></label>
      <div className="card-3d-wrap">
        <div className="card-3d-wrapper">
          <div className="card-front">
            <div className="center-wrap">
              <form className="reglog__form">
                <h4 className="reglog__formHeader">Log In</h4>
                <input
                  type="email"
                  name="logemail"
                  className="form-style"
                  placeholder="Your Email"
                  id="logemail"
                  autoComplete="off"
                />
                <input
                  type="password"
                  name="logpass"
                  className="form-style"
                  placeholder="Your Password"
                  id="logpass"
                  autoComplete="off"
                />
                <button className="btn mt-4">submit</button>
                <p className="mb-0 mt-4 ">
                  <a href="#0" className="link">
                    Forgot your password?
                  </a>
                </p>
              </form>
            </div>
          </div>
          <div className="card-back">
            <div className="center-wrap">
              <div className="section">
                <h4 className="reglog__formHeader">Sign Up</h4>
                <input
                  type="email"
                  name="logemail"
                  className="form-style"
                  placeholder="Your Email"
                  id="logemail"
                  autoComplete="off"
                />
                <input
                  type="password"
                  name="logpass"
                  className="form-style"
                  placeholder="Your Password"
                  id="logpass"
                  autoComplete="off"
                />
                <button className="btn mt-4">submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

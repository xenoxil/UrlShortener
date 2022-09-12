import { useRef } from 'react';
/*import { FormValidator } from '../FormValidator';
import { loginConfig } from '../../utils/constants';*/
import Notification from '../Notification/Notification';

function Reglog(props: any) {
  const emailReg = useRef<any>();
  const passwordReg = useRef<any>();
  const emailLog = useRef<any>();
  const passwordLog = useRef<any>();

  /* React.useEffect(() => {
    const loginForm = document.getElementById('loginForm');
    const loginFormValidation = new FormValidator(loginConfig, loginForm);
    loginFormValidation.enableValidation();
  }, []);*/

  function handleSubmitLogin(e: any): void {
    e.preventDefault();
    props.onLogin(emailLog.current.value, passwordLog.current.value);
  }

  function handleSubmitRegister(e: any): void {
    e.preventDefault();
    props.onRegister(emailReg.current.value, passwordReg.current.value);
  }

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
                    ref={emailLog}
                  />
                  <input
                    type="password"
                    name="logpass"
                    className="form-input"
                    placeholder="Your Password"
                    id="logpass"
                    autoComplete="off"
                    ref={passwordLog}
                  />
                </div>
                <button className="reglog__submitBtn" onClick={handleSubmitLogin} disabled={props.buttonDisableState}>
                  submit
                </button>
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
                    id="regemail"
                    autoComplete="off"
                    ref={emailReg}
                  />
                  <input
                    type="password"
                    name="logpass"
                    className="form-input"
                    placeholder="Your Password"
                    id="regpass"
                    autoComplete="off"
                    ref={passwordReg}
                  />
                </div>
                <button
                  className="reglog__submitBtn"
                  onClick={handleSubmitRegister}
                  disabled={props.buttonDisableState}>
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Notification isVisible={props.isNotificationVisible} notificationMessage={props.notificationMessage} />
    </section>
  );
}

export default Reglog;

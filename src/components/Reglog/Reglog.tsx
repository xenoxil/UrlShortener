import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import Notification from '../Notification/Notification';
import mainStore from '../../store/mainStore';
import notificationStore from '../../store/notificationStore';
import mainApi from '../../utils/Api';

const Reglog = observer(() => {
  const emailReg = useRef<any>();
  const passwordReg = useRef<any>();
  const emailLog = useRef<any>();
  const passwordLog = useRef<any>();
  const router = useRouter();


  function handleLoginClick(email: string, password: string) {    
    mainStore.setButtonDisableState(true);
    mainApi
      .login(email, password)
      .then((res) => {
        notificationStore.handlingNotification('Successfull log in');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('token_type', res.token_type);
        mainStore.setUserEmail(email);
        mainStore.setLoggedInState(true);
        router.push('/')        
      })
      .catch((err) => {
        notificationStore.handlingNotification('Error' + err);
        console.log('Ошибка:' + err);
      })
      .finally(() => {
        mainStore.setButtonDisableState(false);
      });
  }

  function handleRegisterClick(email: string, password: string) {
    mainStore.setButtonDisableState(true);
    mainApi
      .register(email, password)
      .then(() => {
        notificationStore.handlingNotification('Successfull register');
        handleLoginClick(email, password);
      })
      .catch((err) => {
        notificationStore.handlingNotification('Error' + err);
        console.log('Ошибка:' + err);
      })
      .finally(() => {
        mainStore.setButtonDisableState(false);
      });
  }


  function handleSubmitLogin(e: any) {
    e.preventDefault();    
     handleLoginClick(emailLog.current.value, passwordLog.current.value)     
  }

  function handleSubmitRegister(e: any): void {
    e.preventDefault();
    handleRegisterClick(emailReg.current.value, passwordReg.current.value);
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
                <h2 className="reglog__formHeader">Log In</h2>
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
                <button
                  className="reglog__submitBtn"
                  onClick={handleSubmitLogin}
                  disabled={mainStore.buttonDisableState}>
                  submit
                </button>
              </form>
            </div>
          </div>
          <div className="card-back">
            <div className="center-wrap">
              <form className="reglog__form">
                <h2 className="reglog__formHeader">Sign Up</h2>
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
                  disabled={mainStore.buttonDisableState}>
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Notification isVisible={notificationStore.visibility} notificationMessage={notificationStore.message} />
    </section>
  );
});

export default Reglog;

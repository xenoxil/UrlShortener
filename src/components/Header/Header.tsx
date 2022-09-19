import {observer} from 'mobx-react-lite'
import mainStore from '../../store/mainStore';
import notificationStore from '../../store/notificationStore';

const  Header = observer (()=>{

  function handleLogoutClick() {
    localStorage.clear();  
    mainStore.setLoggedInState(false);  
    notificationStore.handlingNotification('Successfull log out');
    
  }

  return (
    <section className="section__header">
      <div className="header__container">
        <p className="header__userEmail">{mainStore.userEmail}</p>
        <button className="header__logoutBtn" type="reset" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
    </section>
  );
}) 

export default Header;

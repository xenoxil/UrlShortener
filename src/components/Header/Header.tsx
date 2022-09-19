import {observer} from 'mobx-react-lite'
import Link from 'next/link'
import mainStore from '../../store/mainStore';
import notificationStore from '../../store/notificationStore';
import { useRouter } from 'next/router';

const  Header = observer (()=>{

  const router = useRouter();  

  function handleLogoutClick() {
    localStorage.clear();  
    mainStore.setLoggedInState(false);  
    notificationStore.handlingNotification('Successfull log out');
    router.push('reg-log');
    
  }

  return (
    <section className="section__header">
      <nav className='header__navBar'>
      <Link href="/" >
            <a className={router.route==='/' ? 'header__navBar-link header__navBar-link_current' : 'header__navBar-link' }>
            Main
            </a>
        </Link>
        <Link href="/statistics" >
            <a className={router.route==='/statistics' ? 'header__navBar-link header__navBar-link_current' : 'header__navBar-link' }>
            Statistics
            </a>
        </Link>
      </nav>
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

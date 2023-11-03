import React, { useLayoutEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Reglog from '../Reglog/Reglog';
import Main from '../Main/Main';
import mainApi from '../../utils/Api';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoutes';

function App() {
  const [loggedInState, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [stats, setStats] = useState<any[]>([]);
  const navigate = useNavigate();
  const [shortLink, setShortLink] = useState('');
  const [notificationVisibility, setNotificationVisibility] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [buttonDisableState, setButtonDisableState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [middleResult, setMiddleResult] = useState<any[]>([]);
  const [renderedLinks, setRenderedLinks] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [linksPerPage] = useState(10);
  const [pages, setPages] = useState<number[]>([]);

  const lastLinkIndex = currentPage * linksPerPage;
  const firstLinkIndex = lastLinkIndex - linksPerPage;

  function paginate(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  React.useLayoutEffect(() => {
    document.title = `UrlShortener`;
    Promise.all([mainApi.getUserInfo(), mainApi.getStatistics()])
      .then((res) => {
        const userInfo = res[0].data.data;
        const links = res[1].data.data;
        setUser(userInfo.email);
        setLoggedIn(true);
        navigate('/');
        setStats(links);
        setMiddleResult(links);
        setRenderedLinks(links.slice(firstLinkIndex, lastLinkIndex));
        setIsLoading(false);
      })
      .catch((err) => console.log('Ошибка:', err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useLayoutEffect(() => {
    setRenderedLinks(middleResult.slice(firstLinkIndex, lastLinkIndex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, middleResult]);

  useLayoutEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(middleResult.length / linksPerPage); i++) {
      pageNumbers.push(i);
    }
    setPages(pageNumbers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [middleResult]);

  function handleLoginClick(email: string, password: string, name: string) {
    setButtonDisableState(true);
    mainApi
      .login(email, password)
      .then((res) => {
        handlingNotification('Successfull log in');
        localStorage.setItem('userEmail', email);
        setUser(email);
        setLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        handlingNotification('Error' + err);
        console.log('Ошибка:' + err);
      })
      .finally(() => {
        setButtonDisableState(false);
      });
  }

  function handleRegisterClick(email: string, password: string, name: string) {
    setButtonDisableState(true);
    mainApi
      .register(email, password, name)
      .then((res) => {
        handlingNotification('Successfull register');
        handleLoginClick(email, password, name);
      })
      .catch((err) => {
        handlingNotification('Error' + err);
        console.log('Ошибка:' + err);
      })
      .finally(() => {
        setButtonDisableState(false);
      });
  }

  function handleLogoutClick() {
    localStorage.clear();
    setLoggedIn(false);
    handlingNotification('Successfull log out');
  }

  function squeezeLink(link: string) {
    setButtonDisableState(true);
    mainApi
      .getSqueeze(link)
      .then((res: any) => {
        setShortLink(`${res.data.shortLink}`);
        handlingNotification('Link has been squeezed');
        setStats([res.data, ...stats]);
        setMiddleResult([res.data, ...stats]);
      })
      .catch((err) => {
        if (err === '422') {
          handlingNotification('Error:422. Link should be valid URL');
        } else {
          handlingNotification('Error: ' + err);
        }
      })
      .finally(() => {
        setButtonDisableState(false);
      });
  }

  function handleFiltering(ID: number, link: string, countFilter: string) {
    setButtonDisableState(true);
    let filteredStats = stats;
    if (ID > 0) {
      filteredStats = stats.filter((linkObject: any) => {
        return linkObject.id.toString().includes(ID);
      });
    }
    if (link.length > 0) {
      filteredStats = filteredStats.filter((linkObject: any) => {
        return linkObject.longLink.includes(link);
      });
    }
    if (countFilter === 'ASC') {
      filteredStats.sort((a: any, b: any) => {
        return a.counter - b.counter;
      });
    } else if (countFilter === 'DESC') {
      filteredStats.sort((a: any, b: any) => {
        return b.counter - a.counter;
      });
    }
    setMiddleResult(filteredStats);
    handlingNotification('Successful filtering');
    setCurrentPage(1);
    setButtonDisableState(false);
  }

  function handlingNotification(notificationMessage: string) {
    setNotificationMessage(notificationMessage);
    setNotificationVisibility(true);
    setTimeout(() => {
      setNotificationVisibility(false);
    }, 5000);
  }

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/reg-log'
          element={
            <Reglog
              onRegister={handleRegisterClick}
              onLogin={handleLoginClick}
              handlingNotification={handlingNotification}
              isNotificationVisible={notificationVisibility}
              notificationMessage={notificationMessage}
              buttonDisableState={buttonDisableState}
            />
          }
        />
        <Route element={<ProtectedRoute loggedIn={loggedInState} />}>
          <Route
            path='/'
            element={
              <Main
                userEmail={user}
                links={stats}
                shortLink={shortLink}
                squeeze={squeezeLink}
                logOut={handleLogoutClick}
                filtering={handleFiltering}
                renderedLinks={renderedLinks}
                handlingNotification={handlingNotification}
                isNotificationVisible={notificationVisibility}
                notificationMessage={notificationMessage}
                buttonDisableState={buttonDisableState}
                isLoading={isLoading}
                paginate={paginate}
                linksPerPage={linksPerPage}
                currentPage={currentPage}
                pages={pages}
                setPages={setPages}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

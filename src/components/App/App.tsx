import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Reglog from '../Reglog/Reglog';
import Main from '../Main/Main';
import mainApi from '../utils/Api';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoutes';

function App() {
  const [loggedInState, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();
  const [token,setToken]=useState('');
  const [shortLink,setShortLink]=useState('');
  const [filtered,setFiltered]=useState([]);
  const [notificationVisibility, setNotificationVisibility] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(''); 
  const [buttonDisableState, setButtonDisableState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [linksPerPage] = useState(10);

  const lastLinkIndex = currentPage * linksPerPage;
  const firstLinkIndex = lastLinkIndex - linksPerPage;
  const currentLinks = stats.slice(firstLinkIndex, lastLinkIndex);

  function paginate(pageNumber:number){
    setCurrentPage(pageNumber)
    handlingNotification(`${pageNumber}`);
  }


  React.useEffect(() => {
    document.title = `UrlShortener`;    
    if(localStorage.getItem('access_token')){
      setUser(localStorage.getItem('userEmail') ?? '');
      setToken(localStorage.getItem('access_token') ?? '')
      setLoggedIn(true);
      navigate('/');
      setIsLoading(true);
      mainApi.getStatistics(localStorage.getItem('access_token') ?? '')
    .then((stats)=>{
      setStats(stats);
      setFiltered(stats.slice(firstLinkIndex, lastLinkIndex));
      setIsLoading(false);      
    })
      .catch((err) => console.log('Ошибка:', err));
  }}, [user]);

  function handleLoginClick(email: string, password: string) {
    setButtonDisableState(true);
    mainApi
      .login(email, password)
      .then((res) => {        
        handlingNotification('Successfull log in')
        localStorage.setItem('userEmail',email);
        localStorage.setItem('access_token',res.access_token);
        localStorage.setItem('token_type',res.token_type);
        setUser(email);
        setLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        handlingNotification('Error'+err);
        console.log('Ошибка:' + err);
      })
      .finally(()=>{
        setButtonDisableState(false);
      })
  }

  function handleRegisterClick(email: string, password: string) {
    setButtonDisableState(true);
    mainApi
      .register(email, password)
      .then((res) => {
        handlingNotification('Successfull register')
        handleLoginClick(email, password);
      })
      .catch((err) => {
        handlingNotification('Error'+err);
        console.log('Ошибка:' + err);
      })
      .finally(()=>{
        setButtonDisableState(false);
      })
  }

  function handleLogoutClick(){
    localStorage.clear();
    setLoggedIn(false);
    handlingNotification('Successfull log out')
  }

  function squeezeLink(link:string){    
    setButtonDisableState(true);
     mainApi.getSqueeze(link,token)
     .then((res:any)=>{      
        setShortLink(`http://79.143.31.216/s/${res.short}`)
        handlingNotification('Link has been squeezed');        
     })
     .catch((err)=>{      
      if(err==='422'){
        handlingNotification('Error:422. Link should be valid URL'); 
      }
      else{
        handlingNotification('Error: '+err);        
      }
      
     })
     .finally(()=>{
      setButtonDisableState(false);
     })
  }

   function handleFiltering(ID:number,link:string,countFilter:string){
    setButtonDisableState(true);
      let filteredStats=stats;
          if(ID>0){
            filteredStats=stats.filter((linkObject:any)=>{
            return linkObject.id.toString().includes(ID)
          })}
          if(link.length>0){
            filteredStats=filteredStats.filter((linkObject:any)=>{
              return linkObject.target.includes(link)
            })
          }
          if(countFilter==='ASC'){
            filteredStats.sort((a:any,b:any)=>{
              return a.counter-b.counter
            })          
          }
          else if(countFilter==='DESC'){
            filteredStats.sort((a:any,b:any)=>{
              return b.counter-a.counter
            })   
          }          
            setFiltered(filteredStats);
            handlingNotification('Successful filtering')
            setButtonDisableState(false);
   }

   function handlingNotification(notificationMessage:string) {    
    setNotificationMessage(notificationMessage);
    setNotificationVisibility(true);
    setTimeout(() => {
      setNotificationVisibility(false);
    }, 5000);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/reg-log" element={<Reglog onRegister={handleRegisterClick} onLogin={handleLoginClick}
         handlingNotification={handlingNotification}
         isNotificationVisible={notificationVisibility}
            notificationMessage={notificationMessage}
            buttonDisableState={buttonDisableState}/>}
             />
        <Route element={<ProtectedRoute loggedIn={loggedInState} />}>
          <Route path="/" element={<Main
          userEmail={user}
          links={stats}
          shortLink={shortLink}
          squeeze={squeezeLink}
          logOut={handleLogoutClick}
          filtering={handleFiltering}
          filtered={filtered}
          handlingNotification={handlingNotification}
          isNotificationVisible={notificationVisibility}
            notificationMessage={notificationMessage}
            buttonDisableState={buttonDisableState}
            isLoading={isLoading}
            paginate={paginate}
            linksPerPage={linksPerPage}
            currentPage={currentPage}
             />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

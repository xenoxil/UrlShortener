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


  React.useEffect(() => {
    document.title = `UrlShortener`;    
    if(localStorage.getItem('access_token')){
      setUser(localStorage.getItem('userEmail') ?? '');
      setToken(localStorage.getItem('access_token') ?? '')
      setLoggedIn(true);
      navigate('/');
      mainApi.getStatistics(localStorage.getItem('access_token') ?? '')
    .then((stats)=>{
      setStats(stats);
      console.log(stats);
    })
      .catch((err) => console.log('Ошибка:', err));
  }}, [user]);

  function handleLoginClick(email: string, password: string) {
    mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem('userEmail',email);
        localStorage.setItem('access_token',res.access_token);
        localStorage.setItem('token_type',res.token_type);
        setUser(email);
        setLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        console.log('Ошибка:' + err);
      });
  }

  function handleRegisterClick(email: string, password: string) {
    mainApi
      .register(email, password)
      .then((res) => {
        handleLoginClick(email, password);
      })
      .catch((err) => {
        console.log('Ошибка:' + err);
      });
  }

  function handleLogoutClick(){
    localStorage.clear();
    setLoggedIn(false);
  }

  function squeezeLink(link:string){
     mainApi.getSqueeze(link,token)
     .then((res)=>{
        setShortLink(`http://79.143.31.216/s/${res.short}`)
     })
  }

   function handleFiltering(ID:number,link:string,countFilter:string){
      let filteredStats=stats;
      debugger;
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
         
                             
   }

  return (
    <div className="App">
      <Routes>
        <Route path="/reg-log" element={<Reglog onRegister={handleRegisterClick} onLogin={handleLoginClick} />} />
        <Route element={<ProtectedRoute loggedIn={loggedInState} />}>
          <Route path="/" element={<Main
          userEmail={user}
          links={stats}
          shortLink={shortLink}
          squeeze={squeezeLink}
          logOut={handleLogoutClick}
          filtering={handleFiltering}
          filtered={filtered} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

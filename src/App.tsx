import React from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom';
import Reglog from './components/reglog/Reglog'
import Main from './components/main/Main'
import mainApi from './components/utils/MainApi';

function App() {
  return (
    <div className="App"> 
        <Routes>
          <Route path="/reg-log" element={<Reglog/>}/>
          <Route path="/main" element={<Main/>}/>
        </Routes>
    </div>
  );
}

export default App;

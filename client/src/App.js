import './App.css';
import { Route } from 'react-router-dom'
import Home from './Components/Home/Home';
import Videogames from './Components/Videogames/Videogames';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <Route path='/' exact>
        <Home/>
      </Route>
      <Route path='/videogames' exact>
        <Videogames/>
      </Route>
    </React.Fragment>
  );
}

export default App;

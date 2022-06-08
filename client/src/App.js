import './App.css';
import { Route } from 'react-router-dom'
import Videogames from './Components/Home/Videogames/Videogames';
import React from 'react';
import VideogameDetail from './Components/Home/VideogameDetail/VideogameDetail';
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  return (
    <React.Fragment>
      <Route path='/' exact>
        <LandingPage/>
      </Route>
      <Route path='/videogames' exact>
        <Videogames/>
      </Route>
      <Route path='/videogames/:id' exact>
        <VideogameDetail/>
      </Route>
    </React.Fragment>
  );
}

export default App;

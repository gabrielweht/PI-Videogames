import './App.css';
import { Route } from 'react-router-dom'
import Videogames from './Components/Home/Videogames/Videogames';
import React from 'react';
import VideogameDetail from './Components/Home/VideogameDetail/VideogameDetail';
import LandingPage from './Components/LandingPage/LandingPage';
import PostGame from './Components/Home/Create Videogame/CreateGame';

function App() {
  return (
    <React.Fragment>
      <Route path='/' exact>
        <LandingPage/>
      </Route>
      <Route path='/videogames' exact component={Videogames}>
      </Route>
      <Route path='/videogame/create' exact>
        <PostGame />
      </Route>
      <Route path='/videogames/:id' exact>
        <VideogameDetail/>
      </Route>
      
    </React.Fragment>
  );
}

export default App;

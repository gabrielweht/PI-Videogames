import './App.css';
import { Route } from 'react-router-dom'
import Videogames from './Components/Home/Videogames/Videogames';
import React from 'react';
import VideogameDetail from './Components/Home/VideogameDetail/VideogameDetail';
import LandingPage from './Components/LandingPage/LandingPage';
import CreateGame from './Components/Home/Create Videogame/CreateGame';
import Footer from './Components/Home/Footer/Footer';

function App() {
  return (
    <React.Fragment>
      <Route path='/' exact>
        <LandingPage/>
      </Route>
      <Route path='/videogames' exact component={Videogames}>
      </Route>
      <Route path='/videogame/create' exact>
        <CreateGame />
      </Route>
      <Route path='/videogames/:id' exact>
        <VideogameDetail/>
      </Route>
      <Route path='/'>
        <Footer />
      </Route>
    </React.Fragment>
  );
}

export default App;

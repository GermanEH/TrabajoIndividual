import './App.css';
import React from 'react'
import {Route, Link} from 'react-router-dom'
import logo from './assets/PBVi.gif'
import NavBar from './components/containers/NavBar.jsx'
import NewPokemon from './components/containers/NewPokemon.jsx'
import Pokemons from './components/containers/Pokemons.jsx'
import PokemonDetail from './components/renders/PokemonDetail.jsx'
import Pokebola from './components/containers/Pokebola.jsx'

function App() {

  return (
    <div className="App">
      <Link to="/"><div className="banner_to_home"></div></Link>
      <header className="App-header">
        <NavBar />
      </header>
      <div className="body">
      <Route
        path='/pokebola'
        component={Pokebola}
        >
      </Route>
      <Route
        path='/pokemon/create'
        component={NewPokemon}
				>
      </Route>
      <Route
        path="/pokemons/:id"
        component={PokemonDetail}>
      </Route>
      <Route
        path='/home'
        >
          <Pokemons/>
      </Route>
      <Route
      exact path='/'>
        <Link to="/home" style={{ textDecoration: 'none' , color: 'black'}}>
          <div className="landing">
            <h1>Bienvenido</h1>
            <img src={logo} alt="loading..." widht="150" height="150"/>
          </div>
          </Link>
      </Route>
      </div>
    </div> 
  );
}

export default App;

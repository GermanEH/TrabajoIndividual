import './App.css';
import React from 'react'
import {Route, Switch, Link} from 'react-router-dom'

import NavBar from './components/NavBar.jsx'
import NewPokemon from './components/NewPokemon.jsx'
import Pokemons from './components/Pokemons.jsx'
import PokemonDetail from './components/PokemonDetail.jsx'
import Filters from './components/Filters.jsx'
// import FilterByType from './components/FilterByType.jsx'
// import FilterByOrigin from './components/FilterByOrigin.jsx'
import Sorters from './components/Sorters.jsx'
// import OrderByName from './components/OrderByName.jsx'
// import OrderByAttack from './components/OrderByAttack.jsx'

function App() {
  //Route es un componente que viene armado con diversas propiedades        //página principal
  // <Pokemons pokemons={onFilter()}/>
  // <Pokemons pokemons={onSort()}/>
  //con path + component puedo hacer 'paths dinámicos'
  //component POR DEFAUL le pasa tres props: MATCH, LOCATION, HISTORY
  //<Route                    //RENDER en vez de component si quiero pasarle propiedades al componente
        // exact path='/pokemons/:id'
        // render={() => {}}
  //reemplaza al Switch de la v5 de R.R.
  //y lo envuelve BrowserRouter o HashRouter (agrega un # a la ruta) FALTA HACER ESTO?

  return (
    <div className="App">
      <h1><Link to="/home">Henry Pokemon</Link></h1>
      <NavBar />
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
    </div> 
  );
}

{/* <Sorters/> */}
{/* <Filters/> */}
{/* <FilterByType/>
<FilterByOrigin/> */}

{/* <OrderByName/>
<OrderByAttack/> */}

//averiguar para que sirve React.Fragment

//<Link/> es OTRO COMPONENTE que genera un <a> </a> que permite REDIRIGIR a otra URL
// LINK PERMITE NAVEGAR ENTRE LAS ROUTE SIN TENER QUE MODIFICAR MANUALMENTE LA URL

export default App;

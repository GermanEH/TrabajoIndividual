import axios from 'axios'

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_ALL_TYPES = 'GET_ALL_TYPES'
export const GET_POKEMON = 'GET_POKEMON'
export const CREATE_POKEMON = 'CREATE_POKEMON'
export const FILTER_POKEMONS_BY_TYPE = 'FILTER_POKEMONS_BY_TYPE'
export const FILTER_POKEMONS_BY_ORIGIN = 'FILTER_POKEMONS_BY_ORIGIN'
export const ADD_POKEMON_CAPTURED = 'ADD_POKEMON_CAPTURED'
export const REMOVE_POKEMON_CAPTURED = 'REMOVE_POKEMON_CAPTURED'

//AGREGAR CONDICIONALES: SI YA TENGO UN POKEMON, NO HACER AXIOS DEVUELTA

export function getAllPokemons () {
    return function (dispatch) {
        axios.get('http://localhost:3001/pokemons')
        .then(response => response.data)                                  //¿ES NECESARIO?
        .then(d => dispatch({type: GET_ALL_POKEMONS, payload: d}))
        .catch(e => console.log(e))                                       //COMPLETAR ESTO
    }
}

// function mapTypes (data) {
//     let typesMap = new Map();
//     let typesNames = data.map(t => t.name)
//     for (const name of typesNames) typesMap.set(name, false)
//     return typesMap
// }

// export function getAllTypesMap () {
//     return function (dispatch) {
//         axios.get('http://localhost:3001/types')
//         .then(response => response.data)                                  //¿ES NECESARIO?
//         .then(data => mapTypes(data))
//         .then(data => dispatch({type: GET_ALL_TYPES_MAP, payload: data}))
//         .catch(e => console.log(e))
//     }
// }

export function getAllTypes () {
    return function (dispatch) {
        axios.get('http://localhost:3001/types')
        .then(response => response.data)
        .then(data => dispatch({type: GET_ALL_TYPES, payload: data}))
        .catch(e => console.log(e))
    }
}

// const pokemon = r.data
//     setPokemons(oldPokemons => [...oldPokemons, ...pokemon])            //NO ENTIENDO PORQUÉ TUVE QUE HACER SPREAD DE TYPE tambien

//  id (por params) de API   					pokemons 1ro
//  id (por params) de Pokemon 		    pokemons 1ro
//  name (por query) de API						OK
//  name (por query) de Pokemon				formulario de creación 1ro

export function getPokemon (pokemon) {
    return function (dispatch) {
        if(isNaN(pokemon)) {
            axios.get(`http://localhost:3001/pokemons/?name=${pokemon}`)
            .then(response => response.data)                              //¿ES NECESARIO?
            .then(data => dispatch({type: GET_POKEMON, payload: data}))
		} else if (typeof parseInt(pokemon) === 'number'){
            axios.get(`http://localhost:3001/pokemons/${pokemon}`)
            .then(response => response.data)                              //¿ES NECESARIO?
            .then(data => dispatch({type: GET_POKEMON, payload: data}))
            .catch(e => console.log(e))
        } else {
			alert('Pokemon not found')
        }
	} 
}

export function createPokemon(pokemon) {
    let newPokemon = {
        image: pokemon.image, 
        name: pokemon.name, 
        id: pokemon.id, 
        hp: pokemon.hp, 
        attack: pokemon.attack, 
        defense:pokemon.defense, 
        speed: pokemon.speed, 
        weight: pokemon.weight, 
        height: pokemon.height,
        types: pokemon.types,
    }
    console.log(newPokemon)
    return function (dispatch) {
        if(pokemon) {
            var res = axios.post('http://localhost:3001/pokemons', newPokemon)
            return dispatch({
                type: 'CREATE_POKEMON',
                payload: res
            })
        } 
    }
}

export function filterByTypes([selectedTypes, filtered]) {
    for (const type of selectedTypes) {
        for(const types of filtered) {
            if(types.includes(type)) continue;
            else return false;
        }

    } return true;
}


export function filterPokemons(arrCompuesto) {
    return function(dispatch){
        let typesNames = arrCompuesto[0]
        let typeFilters = arrCompuesto[1]
        if(typesNames && typeFilters) {
            console.log('entré')
            for(const valorABuscar of typeFilters) {
                if(typesNames.includes(valorABuscar) === false){
                    console.log('entré1')
                    return dispatch({
                        type:FILTER_POKEMONS_BY_ORIGIN,
                        payload:typeFilters
                    })
                } else {
                    console.log('entré2')
                    return dispatch({
                        type:FILTER_POKEMONS_BY_TYPE,
                        payload:typeFilters
                    })
            }
        }
        }
    }
}

export function addCapture (payload) {
    return {
        type: ADD_POKEMON_CAPTURED,
        payload
    }
}

export function removeCapture (payload) {
    return {
        type: REMOVE_POKEMON_CAPTURED,
        payload
    }
}

// export function filterPokemons(filters) {
//     const types = getAllTypesArr()
//     const pokemons = getAllPokemons()
//     const pokemonsFiltered = []
//     return function(dispatch){
//         for(const valorABuscar of filters) {
//             const exists = types.includes(valorABuscar)
//             if(!exists){
//                 return dispatch({
//                     type:FILTER_POKEMONS_BY_ORIGIN,
//                     filters
//                 })
//             } else {
//                 for (const pokemonAFiltrar of pokemons) {
//                     while(filters.length > 0){
//                             for(const valorABuscar of filters){
//                                 if(pokemonAFiltrar.types.includes(valorABuscar)) continue;
//                             else break
//                         } 
//                     } pokemonsFiltered.push(pokemonAFiltrar)
//                 } 
//                     return dispatch({
//                         type:FILTER_POKEMONS_BY_TYPE,
//                         filters
//                 })
//         }
//     }
// }
// }

  // function onFilter(){
  //   let pokemonsCreated = pokemons.filter(p => p.id > 950)
  // }
  //   let pokemonsByType = pokemons.filter()

  // function onSort(){
  //   let pokemonsAscByAlph = pokemons.sort()
  //   let pokemonsDescByAlph = pokemons.sort()
  //   let pokemonsAscByAttack = pokemons.sort()
  //   let pokemonsDescByAttack = pokemons.sort()
  //
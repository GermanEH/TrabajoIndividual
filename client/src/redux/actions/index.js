import axios from 'axios'

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_ALL_POKEMONS_CREATED = 'GET_ALL_POKEMONS_CREATED';
export const GET_ALL_TYPES = 'GET_ALL_TYPES'
export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL'
export const GET_POKEMON_CARD = 'GET_POKEMON_CARD'
export const CREATE_POKEMON = 'CREATE_POKEMON'
export const FILTER_POKEMONS_BY_TYPE = 'FILTER_POKEMONS_BY_TYPE'
export const FILTER_POKEMONS_BY_ORIGIN = 'FILTER_POKEMONS_BY_ORIGIN'
export const ADD_POKEMON_CAPTURED = 'ADD_POKEMON_CAPTURED'
export const REMOVE_POKEMON_CAPTURED = 'REMOVE_POKEMON_CAPTURED'

export function getAllPokemons () {
    return function (dispatch) {
        axios.get('http://localhost:3001/pokemons')
        .then(response => response.data)                                  
        .then(d => dispatch({type: GET_ALL_POKEMONS, payload: d}))
        .catch(e => console.log(e))                                       
    }
}
export function getAllPokemonsCreated () {
    return function (dispatch) {
        axios.get('http://localhost:3001/pokemonsCreated')
        .then(response => response.data)                                  
        .then(d => dispatch({type: GET_ALL_POKEMONS_CREATED, payload: d}))
        .catch(e => console.log(e))                                       
    }
}

export function getAllTypes () {
    return async function (dispatch) {
        await axios.get('http://localhost:3001/types')
        .then(response => response.data)
        .then(data => dispatch({type: GET_ALL_TYPES, payload: data}))
        .catch(e => console.log(e))
    }
}

//  id (por params) de API   					pokemons 1ro
//  id (por params) de Pokemon 		    pokemons 1ro
//  name (por query) de API						OK
//  name (por query) de Pokemon				formulario de creación 1ro

export function getPokemonDetail (pokemon) {
    return function (dispatch) {
        if(isNaN(pokemon)) {
            axios.get(`http://localhost:3001/pokemons/?name=${pokemon}`)
            .then(response => response.data)                              
            .then(data => dispatch({type: GET_POKEMON_DETAIL, payload: data}))
		} else if (typeof parseInt(pokemon) === 'number'){
            axios.get(`http://localhost:3001/pokemons/${pokemon}`)
            .then(response => response.data)                             
            .then(data => dispatch({type: GET_POKEMON_DETAIL, payload: data}))
            .catch(e => console.log(e))
        } else {
			alert('Pokemon not found')
        }
	} 
}

export function getPokemonCard (pokemon) {
    return function (dispatch) {
        if(pokemon) {
            axios.get(`http://localhost:3001/pokemons/?name=${pokemon}`)
            .then(response => [response.data])                              
            .then(data => dispatch({type: GET_POKEMON_CARD, payload: data}))
        } else if (typeof parseInt(pokemon) === 'number'){
            axios.get(`http://localhost:3001/pokemons/${pokemon}`)
            .then(response => [response.data])                             
            .then(data => dispatch({type: GET_POKEMON_CARD, payload: data}))
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

// export function handleFilterByTypes (typeName) {
//     if (selectedTypes.has(typeName)) {
//         setSelectedTypes(selectedTypes.delete(typeName))
//         if(selectedTypes.size > 0) {
//             for (const type of selectedTypes) {
//                 setFiltered(pokemons.filter(p => p.types.includes(type)))
//             }
//         } else { 
//                 getAllPokemons(); setRender(true)}
//     } else {
//         setSelectedTypes(selectedTypes.add(typeName))
//         for (const type of selectedTypes) {
//             setFiltered(filtered.filter(p => p.types.includes(type))) 
//         }
//     } 
//     setSelectedTypes(selectedTypes)
// }

// export function handleFilterByOrigin (newOrigin) {
//     if (newOrigin === 'original') {
//         let filterPokemons = filtered.filter(p => p.id < 950)
//         setFiltered(filterPokemons)
//     } else {
//         let filterPokemons = filtered.filter(p => p.id > 950)
//         setFiltered(filterPokemons)
//     }
// }

// export function handleOrderAscByAttack () {
//     setFiltered(filtered.sort(function(a,b) {
//         if(a.attack < b.attack) return -1;
//         if(a.attack > b.attack) return 1;
//         return 0
//     }))
// }

// export function handleOrderDescByAttack () {
//     setFiltered(filtered.sort(function(a,b) {
//         if(b.attack < a.attack) return -1;
//         if(b.attack > a.attack) return 1;
//         return 0
//     }))
// }

// export function handleOrderAscByName () {
//     setFiltered(filtered.sort(function(a,b) {
//         if(a.name < b.name) return -1;
//         if(a.name > b.name) return 1;
//         return 0
//     }))
// }

// export function handleOrderDescByName () {
//     setFiltered(filtered.sort(function(a,b) {
//         if(b.name < a.name) return -1;
//         if(b.name > a.name) return 1;
//         return 0
//     }))
// }

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
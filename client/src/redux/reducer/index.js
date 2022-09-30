import { GET_ALL_POKEMONS, GET_ALL_TYPES, GET_POKEMON_CARD, GET_POKEMON_DETAIL, CREATE_POKEMON, ADD_POKEMON_CAPTURED, REMOVE_POKEMON_CAPTURED } from '../actions/index'

const initialState = {
    pokemons: [],
    types: [],
    pokemonCard: [],
    pokemonDetail: [],
    pokemonsCaptured: [],
}


export default function rootReducer (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_POKEMONS:
            return  {
                ...state,
                pokemons: action.payload
            }
        case GET_POKEMON_CARD:
            return  {
                ...state,
                pokemonCard: action.payload
            }
        case GET_POKEMON_DETAIL:
            return  {
                ...state,
                pokemonDetail: action.payload
            }
        case GET_ALL_TYPES:
            return  {
                ...state,
                types: action.payload
            }
        case CREATE_POKEMON:
            return  {
                ...state,
                pokemons: [...state.pokemons, action.payload]
            }
        case ADD_POKEMON_CAPTURED:
            return {
                ...state,
                pokemonsCaptured: [...state.pokemonsCaptured, action.payload]
            }
        case REMOVE_POKEMON_CAPTURED:
            return {
                ...state,
                pokemonsCaptured: state.pokemonsCaptured.filter(pc => pc.name !== action.payload)
            }
        default: 
            return state;
    }
}
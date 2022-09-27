import { GET_ALL_POKEMONS, GET_ALL_TYPES_MAP, GET_ALL_TYPES_ARR, GET_POKEMON, CREATE_POKEMON, FILTER_POKEMONS_BY_TYPE, FILTER_POKEMONS_BY_ORIGIN, arrComparison } from '../actions/index'

const initialState = {
    pokemons: [],
    typesMap: {},
    typesArr: [],
}


export default function rootReducer (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_POKEMONS:
            return  {
                ...state,
                pokemons: action.payload
            }
        case GET_POKEMON:
            return  {
                ...state,
                pokemons: action.payload
            }
        case GET_ALL_TYPES_MAP:
            return  {
                ...state,
                typesMap: action.payload
            }
        case GET_ALL_TYPES_ARR:
            return  {
                ...state,
                typesArr: action.payload
            }
        case CREATE_POKEMON:
            return  {
                ...state,
                pokemons: [...state.pokemons, action.payload]
            }
        case FILTER_POKEMONS_BY_TYPE:
            return  {
                ...state,
                pokemons: state.pokemons.filter(pokemon => arrComparison([action.payload, pokemon]))
            }
        case FILTER_POKEMONS_BY_ORIGIN:
            return  {
                ...state,
                pokemons: state.pokemons.filter(pokemon => pokemon.id === action.payload)
            }
        default: 
            return state;
    }
}
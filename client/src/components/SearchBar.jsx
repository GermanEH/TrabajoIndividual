import React, {useState} from 'react';
import { connect } from "react-redux";
import { getPokemon } from '../redux/actions'
import { Link } from "react-router-dom";

const SearchBar = ({getPokemon}) => {
    const [newPokemon, setNewPokemon] = useState("")
    return (
        <div>
            <form onSubmit={(e) => {
            e.preventDefault();
            getPokemon(newPokemon);
            }}>
                <input 
                type="text"
                placeholder="Pokemón..."
                value={newPokemon}
                onChange={e => setNewPokemon(e.target.value)}/>
                <input type="submit" value="Buscar"/>
            </form>
        </div>
    )
}

const MapStateToProps = (state) => {
    return {
        pokemon: state.pokemons
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        getPokemon: (pokemon) => dispatch(getPokemon(pokemon))
    }
}

export default connect (MapStateToProps, MapDispatchToProps)(SearchBar);

//ver de agregar QUE SEA EXACTO el name
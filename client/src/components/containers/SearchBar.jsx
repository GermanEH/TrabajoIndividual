import React, {useState} from 'react';
import { connect } from "react-redux";
import { getPokemonCard } from '../../redux/actions'

const SearchBar = ({getPokemonCard}) => {
    const [newPokemon, setNewPokemon] = useState("")
    return (
        <div>
            <form onSubmit={(e) => {
            e.preventDefault();
            getPokemonCard(newPokemon);
            setNewPokemon("")
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
        pokemons: state.pokemons
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        getPokemonCard: (pokemon) => dispatch(getPokemonCard(pokemon))
    }
}

export default connect (MapStateToProps, MapDispatchToProps)(SearchBar);

//ver de agregar QUE SEA EXACTO el name
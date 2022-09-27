import React, {useEffect} from 'react';
import { connect } from "react-redux";
import './PokemonDetail.css';
import { getPokemon } from "../redux/actions"

const PokemonDetail = (props) => {
    console.log(props.match.params.id)
    const pokemonId = props.match.params.id
    
    useEffect(() => {
        props.getPokemon(pokemonId)
    }, [])

    return (
        <div>
            <div className="pokemon-container">
                <div className="pokemon-head">
                    <h3>
                        {props.pokemons.name}
                    </h3>
                    <div>
                        <img src={props.pokemons.image} alt="not found" height='500'/>
                    </div>
                </div>
                <div className="pokemon-info">
                    <div className="pokemon-data">
                        <div className="pokemon-stat">
                            Types: {props.pokemons.types}
                        </div>
                        <div className="pokemon-stat">
                            Id: {props.pokemons.id}
                        </div>
                        <div className="pokemon-stat">
                            Hp: {props.pokemons.hp}
                        </div>
                        <div className="pokemon-stat">
                            Attack: {props.pokemons.attack}
                        </div>
                        <div className="pokemon-stat">
                            Defense: {props.pokemons.defense}
                        </div>
                        <div className="pokemon-stat">
                            Speed: {props.pokemons.speed}
                        </div>
                        <div className="pokemon-stat">
                            Weight: {props.pokemons.weight}
                        </div>
                        <div className="pokemon-stat">
                            Height: {props.pokemons.height}
                        </div>
                    </div>
                </div>
            </div>
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
        getPokemon: (pokemon) => dispatch(getPokemon(pokemon))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(PokemonDetail); 

//                                          COMPLETAR
import React, {useEffect} from 'react';
import { connect } from "react-redux";
import './PokemonDetail.css';
import { getPokemonDetail } from "../../redux/actions"
import Loader from "./Loader.jsx"

const PokemonDetail = (props) => {

    const pokemonId = props.match.params.id
    console.log(props)
    useEffect(() => {
        props.getPokemonDetail(pokemonId)
    }, [])

    return (
        <div>
            <div>
                {(props.pokemonDetail)?
                <div className="pokemon-container">
                <div className="pokemon-head">
                    <h3>
                        {props.pokemonDetail.name}
                    </h3>
                    <div>
                        <img src={props.pokemonDetail.image} alt="not found" height='500'/>
                    </div>
                </div>
                <div className="pokemon-info">
                    <div className="pokemon-data">
                        <div className="pokemon-stat">
                            Types: {props.pokemonDetail.types}
                        </div>
                        <div className="pokemon-stat">
                            Id: {props.pokemonDetail.id}
                        </div>
                        <div className="pokemon-stat">
                            Hp: {props.pokemonDetail.hp}
                        </div>
                        <div className="pokemon-stat">
                            Attack: {props.pokemonDetail.attack}
                        </div>
                        <div className="pokemon-stat">
                            Defense: {props.pokemonDetail.defense}
                        </div>
                        <div className="pokemon-stat">
                            Speed: {props.pokemonDetail.speed}
                        </div>
                        <div className="pokemon-stat">
                            Weight: {props.pokemonDetail.weight}
                        </div>
                        <div className="pokemon-stat">
                            Height: {props.pokemonDetail.height}
                        </div>
                    </div>
                </div>
            </div>
            : 
            <Loader/>}
            </div>
        </div>
    )
}  

const MapStateToProps = (state) => {
    return {
        pokemonDetail: state.pokemonDetail
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        getPokemonDetail: (pokemon) => dispatch(getPokemonDetail(pokemon))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(PokemonDetail); 

//                                          COMPLETAR
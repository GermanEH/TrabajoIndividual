import React from 'react'
import { connect } from 'react-redux'
import PokemonCard from './PokemonCard.jsx';
import { removeCapture } from '../redux/actions/index.js'

const Pokebola = ({pokemonsCaptured, removeCapture }) => {

    console.log(pokemonsCaptured)
    return (
        <div className="pokemonsCaptured">
            {(pokemonsCaptured?.map((p, i) => {
                return (
                    <PokemonCard
                key={i}
                name={p.name}
                image={p.image}
                types={p.types}
                id={p.id}
                removeCapture={removeCapture}
                />)}))}
        </div>
    )
}

const MapStateToProps = (state) => {
    return {
        pokemonsCaptured: state.pokemonsCaptured
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        removeCapture: (name) => dispatch(removeCapture(name))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Pokebola);
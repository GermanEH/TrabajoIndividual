import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import PokemonCard from './PokemonCard.jsx';
// import './Filter.css' 
import { getAllTypes } from '../redux/actions/index.js'

const Filters = ({getAllTypes, pokemons, types}) => {

    const [filtered, setFiltered] = useState([])

    useEffect(() => {getAllTypes()}, [])

    const handleFilterByType = (newType) => {
        let filterPokemons = pokemons.filter(p => p.types.includes(newType))
        setFiltered(filterPokemons)
    }

    const handleFilterByOrigin = (newOrigin) => {
        if (newOrigin === 'original') {
            let filterPokemons = pokemons.filter(p => p.id < 950)
            setFiltered(filterPokemons)
        } else {
            let filterPokemons = pokemons.filter(p => p.id > 950)
            setFiltered(filterPokemons)
        }
    }

    return (
        <div>
            <h1>Filtros</h1>
            <div className="types">
                {types.map((t, i) => {
                    return (
                        <button onClick={() => handleFilterByType (t.name)}>{t.name}</button>
                    )
                })}
            </div>
            <div className="origin">
                <button onClick={() => handleFilterByOrigin ('original')} key={1}>original</button>
                <button onClick={() => handleFilterByOrigin ('created')} key={2}>created</button>
            </div>
            <div className="pokemons">
                    {filtered.map((p, i) => {
                    return (
                        <PokemonCard
                    key={i}
                    name={p.name}
                    image={p.image}
                    types={p.types}
                    id={p.id}
                    />)})}
                    
            </div>
        </div>
        
    )
}

const MapStateToProps = (state) => {
    return {
        pokemons: state.pokemons,
        types: state.types
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        getAllTypes: () => dispatch(getAllTypes())
    }
}

export default connect (MapStateToProps, MapDispatchToProps)(Filters);
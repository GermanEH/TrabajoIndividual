import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import PokemonCard from './PokemonCard.jsx';
// import './Filter.css' 
import { getAllTypes } from '../redux/actions/index.js'

const FilterByType = ({getAllTypes, pokemons, types}) => {

    const [filtered, setFiltered] = useState([])

    useEffect(() => {getAllTypes()}, [])

    const handleFilter = (newType) => {
        let filterPokemons = pokemons.filter(p => p.types.includes(newType))
        setFiltered(filterPokemons)
    }

    return (
        <div>
            <div className="types">
                {types.map((t, i) => {
                    return (
                        <button onClick={() => handleFilter (t.name)}>{t.name}</button>
                    )
                })}
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

export default connect (MapStateToProps, MapDispatchToProps)(FilterByType);
import React, { useState } from 'react';
import { connect } from "react-redux";
import PokemonCard from './PokemonCard.jsx';
// import './FilterByOrigin.css' 

const FilterByOrigin = ({pokemons}) => {

    const [filtered, setFiltered] = useState([])

    const handleFilter = (newOrigin) => {
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
            <div className="origin">
                <button onClick={() => handleFilter ('original')} key={1}>original</button>
                <button onClick={() => handleFilter ('created')} key={2}>created</button>
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
        pokemons: state.pokemons
    }
}

export default connect (MapStateToProps)(FilterByOrigin);
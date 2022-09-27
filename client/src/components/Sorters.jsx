import React, { useState } from 'react';
import { connect } from "react-redux";
import PokemonCard from './PokemonCard.jsx';
// import './Filter.css' 

const Sorters = ({pokemons}) => {
    const [ordered, setOrdered] = useState([])

    const handleOrderByAttackAsc = () => {
        setOrdered(pokemons.sort(function(a,b) {
            if(a.attack < b.attack) return -1;
            if(a.attack > b.attack) return 1;
            return 0
        }))
    }

    const handleOrderByAttackDesc = () => {
        setOrdered(pokemons.sort(function(a,b) {
            if(b.attack < a.attack) return -1;
            if(b.attack > a.attack) return 1;
            return 0
        }))
    }

    const handleOrderByNameAsc = () => {
        setOrdered(pokemons.sort(function(a,b) {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0
        }))
    }

    const handleOrderByNameDesc = () => {
        setOrdered(pokemons.sort(function(a,b) {
            if(b.name < a.name) return -1;
            if(b.name > a.name) return 1;
            return 0
        }))
    }

    return (
        <div>
            <h1>Sorters</h1>
            <div className="origin">
                <button onClick={handleOrderByAttackAsc}>por ataque ascendente</button>
                <button onClick={handleOrderByAttackDesc}>por ataque descendente</button>
            </div>
            <div className="origin">
                <button onClick={handleOrderByNameAsc}>por nombre ascendente</button>
                <button onClick={handleOrderByNameDesc}>por nombre descendente</button>
            </div>
            <div className="pokemons">
                    {ordered.map((p, i) => {
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

export default connect (MapStateToProps)(Sorters);
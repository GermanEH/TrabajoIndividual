import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import PokemonCard from './PokemonCard.jsx';
// import './Filter.css' 

const OrderByAttack = ({pokemons}) => {
    const [ordered, setOrdered] = useState([])

    const handleOrderAsc = () => {
        setOrdered(pokemons.sort(function(a,b) {
            if(a.attack < b.attack) return -1;
            if(a.attack > b.attack) return 1;
            return 0
        }))
    }

    const handleOrderDesc = () => {
        setOrdered(pokemons.sort(function(a,b) {
            if(b.attack < a.attack) return -1;
            if(b.attack > a.attack) return 1;
            return 0
        }))
    }

    return (
        <div>
            <div className="attack">
                <button onClick={handleOrderAsc}>por ataque ascendente</button>
                <button onClick={handleOrderDesc}>por ataque descendente</button>
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

export default connect (MapStateToProps)(OrderByAttack);
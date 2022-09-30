import React, { useState } from 'react';
import { connect } from "react-redux";
import PokemonCard from './PokemonCard.jsx';
// import './Sorters.css' 

const Sorters = ({handleOrderAscByName, handleOrderDescByName, handleOrderAscByAttack, handleOrderDescByAttack}) => {

    return (
        <div>
            <h3>Ordenar por...</h3>
                <h4>Nombre</h4>
                    <div className="origin">
                        <button onClick={handleOrderAscByName}>por nombre ascendente</button>
                        <button onClick={handleOrderDescByName}>por nombre descendente</button>
                    </div>
                <h4>Ataque</h4>
                    <div className="attack">
                        <button onClick={handleOrderAscByAttack}>por ataque ascendente</button>
                        <button onClick={handleOrderDescByAttack}>por ataque descendente</button>
                    </div>
        </div>
        
    )
}

export default Sorters
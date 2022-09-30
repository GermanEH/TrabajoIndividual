import React from 'react';
import './PokemonCard.css';
import { Link } from "react-router-dom";

export default function PokemonCard ({name, image, attack, types, id, addCapture}) {

    let pokemonData = {name, image, attack, types, id}
    let captured = false
    function handleCapture(){
        if (captured === false) {captured = true}
        else {captured = false}
        addCapture(pokemonData)
    }

    return (
        <div>
            <div className={`pokemon-card ${(captured===true) ? 'pokemon_captured' : 'pokemon_savage'}`}>
                <Link to ={`/pokemons/${id}`} style={{ textDecoration: 'none' }}>
                <h3>
                    {name}
                </h3>
                </Link>
                <div>
                    <img src={image} alt="not found" height='110'/>
                </div>
                <div>
                    {types}
                </div>
                <div onClick={handleCapture}><img src={'https://img.elo7.com.br/product/zoom/28E57D8/pokebola-eva.jpg'} alt="not found" width='20' height='20'/></div>
            </div>
        </div>
        
    )
}
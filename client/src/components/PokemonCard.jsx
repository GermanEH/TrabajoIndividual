import React from 'react';
import './PokemonCard.css';
import { Link } from "react-router-dom";

export default function PokemonCard ({name, image, types, id}) {
    return (
        <div>
            <div className="pokemon-card">
                <Link to ={`/pokemons/${id}`}>
                <h3>
                    {name}
                </h3>
                </Link>
                <div>
                    <img src={image} alt="not found" height='200'/>
                </div>
                <div>
                    {types}
                </div>
            </div>
        </div>
        
    )
}
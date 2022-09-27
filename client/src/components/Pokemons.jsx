import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import PokemonCard from './PokemonCard.jsx';
import Checkbox from './Checkbox.jsx'
import './Pokemons.css' 
import { getAllPokemons, getAllTypesMap, getAllTypesArr, filterPokemons } from '../redux/actions/index.js'

const Pokemons = ({getAllPokemons, getAllTypesMap, getAllTypesArr, filterPokemons, pokemons, typesMap, typesArr}) => {            //hice destructuring porque me lo recomendaba el comment al useEffect (estaba teniendo un loop infinito)

    const [typeFilters, setTypeFilters] = useState([])

    useEffect(() => {getAllPokemons()}, [])
    useEffect(() => {getAllTypesMap()}, [])
    useEffect(() => {getAllTypesArr()}, [])

    let typesNames = []
    let arrCompuesto = []

    function toggleTypes (type) {
        if (typesMap.size > 0) {
            typesMap[type] = !typesMap[type];
            typesNames = typesArr.map(t=>t.name)
            arrCompuesto.push(typesNames)
            console.log(arrCompuesto)
            let selectedTypes = []         //CHEQUEAR EL DATATYPE
            for(let type in typesMap) {
                if(typesMap[type]) {
                    selectedTypes.push(type)
                    setTypeFilters([selectedTypes])
                    arrCompuesto.push(selectedTypes)
                    console.log(selectedTypes)
                    console.log(arrCompuesto)
                    filterPokemons(arrCompuesto)
                } else {
                    typeFilters.filter(t => t !== type)
                    filterPokemons(arrCompuesto)
                }
            }
        }
        }
    
        return (
            <div className="home"> 
                    <h3>Seleccionar por...</h3>
                <div className="types">
                    <h4>Tipos</h4>
                    {(typesArr?.map((type, i) => <Checkbox toggleTypes={toggleTypes} type={type.name} key={i}/>))}
                </div>
                <div className="pokemons">
                {(pokemons.length>1)?
                pokemons.map((p, i) => {
                    return (
                        <PokemonCard
                    key={i}
                    name={p.name}
                    image={p.image}
                    types={p.types}
                    id={p.id}
                    />)}):
                <PokemonCard
                    name={pokemons.name}
                    image={pokemons.image}
                    types={pokemons.types}
                    id={pokemons.id}
                />}
                </div>
            </div>
        )
}

const MapStateToProps = (state) => {
    return {
        pokemons: state.pokemons,
        typesMap: state.typesMap,
        typesArr: state.typesArr
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        getAllPokemons: () => dispatch(getAllPokemons()),
        getAllTypesMap: () => dispatch(getAllTypesMap()),
        getAllTypesArr: () => dispatch(getAllTypesArr()),
        filterPokemons: (filters) => dispatch(filterPokemons(filters))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Pokemons);            //me genera UNA NUEVA función getPokemons (que en clases va con this) y estoy exportando el componente ya inyectándole las propiedades

            /* me llega una arr de pokemones. recorrerlo y deployarlo */

// [ ] Paginado para ir buscando y mostrando los siguientes pokemons, 12 pokemons por pagina.
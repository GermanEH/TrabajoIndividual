import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import PokemonCard from './PokemonCard.jsx';
import Checkbox from './Checkbox.jsx'
import './Pokemons.css' 
import { getAllPokemons, getAllTypesMap, getAllTypesArr, filterPokemons } from '../redux/actions/index.js'

const Pokemons = ({getAllPokemons, getAllTypesMap, getAllTypesArr, filterPokemons, pokemons, typesMap, typesArr}) => {            //hice destructuring porque me lo recomendaba el comment al useEffect (estaba teniendo un loop infinito)

    const [typeFilters, setTypeFilters] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const[currentPage, setCurrentPage] = useState(0)
    const [filtered, setFiltered] = useState([])
    const [ordered, setOrdered] = useState([])

    useEffect(() => {getAllPokemons()}, [])
    useEffect(() => {getAllTypesMap()}, [])
    useEffect(() => {getAllTypesArr()}, [])
    useEffect(() => {pokemons ? setFiltered(pokemons) : setFiltered(['Cargando...'])}, [pokemons])
    // useEffect(() => {if(pokemons) setIsLoading(false)}, [[], pokemons])
    
    // while(isLoading) {
    //     return (
    //         <div className="alert">
    //             <p>Cargando...</p>
    //         </div>
    //     )
    // }

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
                    let filterPokemon = filterPokemons(arrCompuesto)
                    setFiltered(filterPokemon)
                } else {
                    typeFilters.filter(t => t !== type)
                    let filterPokemon = filterPokemons(arrCompuesto)
                    setFiltered(filterPokemon)
                }
            }
        }
        }

    const handleFilter = (newOrigin) => {
        if (newOrigin === 'original') {
            let filterPokemons = filtered.filter(p => p.id < 950)
            setFiltered(filterPokemons)
        } else {
            let filterPokemons = filtered.filter(p => p.id > 950)
            setFiltered(filterPokemons)
        }
    }

    const handleOrderAscByAttack = () => {
        setOrdered(filtered.sort(function(a,b) {
            if(a.attack < b.attack) return -1;
            if(a.attack > b.attack) return 1;
            return 0
        }))
    }

    const handleOrderDescByAttack = () => {
        setOrdered(filtered.sort(function(a,b) {
            if(b.attack < a.attack) return -1;
            if(b.attack > a.attack) return 1;
            return 0
        }))
    }

    const handleOrderAscByName = () => {
        setOrdered(filtered.sort(function(a,b) {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0
        }))
    }

    const handleOrderDescByName = () => {
        setOrdered(filtered.sort(function(a,b) {
            if(b.name < a.name) return -1;
            if(b.name > a.name) return 1;
            return 0
        }))
    }
        
    const slicedPokemons = () => {
        console.log(pokemons)
        console.log(filtered)
        return filtered.slice(currentPage, currentPage + 12)
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 12)
    }
    
    const prevPage = () => {
        if (currentPage > 0)
        setCurrentPage(currentPage - 12)
    }
    
    return (
        <div className="home"> 
            <div className="column-left">
                    <h3>Filtrar por...</h3>
                    <h4>Tipos</h4>
                <div className="types">
                    {(typesArr?.map((type, i) => <div className="type"><Checkbox toggleTypes={toggleTypes} type={type.name} key={i}/></div>))}
                </div>
                    <h4>Origen</h4>
                    <div className="origin">
                        <button onClick={() => handleFilter ('original')} key={1}>original</button>
                        <button onClick={() => handleFilter ('created')} key={2}>created</button>
                    </div>
            </div>
            <div className="body">
                <div className="pokemons">
                {(pokemons.length>1)?
                slicedPokemons()?.map((p, i) => {
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
                <div className="footer">
                    <button
                        className="pagination"
                        onClick={() => prevPage()}>Anteriores</button>
                    <button
                        className="pagination"
                        onClick={() => nextPage()}>Siguientes</button>
                </div>
            </div>
            <div className="column-right">
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
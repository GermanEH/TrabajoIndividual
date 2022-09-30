import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import './Pokemons.css' 
import Filters from '../renders/Filters.jsx'
import Sorters from '../renders/Sorters.jsx'
import Loader from '../renders/Loader.jsx'
import PokemonCard from "../renders/PokemonCard.jsx";
import { getAllPokemons, getAllTypes, addCapture} from '../../redux/actions/index.js'

const Pokemons = ({getAllPokemons, getAllTypes, pokemons, pokemonsCreated, types, pokemonDetail, pokemonCard, addCapture}) => {

    const [filtered, setFiltered] = useState([])
    const [render, setRender] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedTypes, setSelectedTypes] = useState(new Set())

    useEffect(() => {getAllPokemons()}, [])
    useEffect(() => {setFiltered(pokemons)}, [pokemons])
    useEffect(() => {getAllTypes()}, [])

    //Traigo el array de types
    //Declaro un set
    //agrego el type checkeado al set, o lo elimino si descheckeo
    //filtro cada arreglo types de cada pokemon con el set de types. solo renderizo los que tienen todo el set
    //cada vez que elimino un check, vuelvo a renderizar los que tienen el set

    const handleFilterByTypes = (typeName) => {
        if (selectedTypes.has(typeName)) {
            setSelectedTypes(selectedTypes.delete(typeName))
            if(selectedTypes.size > 0) {
                for (const type of selectedTypes) {
                    setFiltered(pokemons.filter(p => p.types.includes(type)))
                }
            } else { 
                    getAllPokemons(); setRender(true)}
        } else {
            setSelectedTypes(selectedTypes.add(typeName))
            for (const type of selectedTypes) {
                setFiltered(filtered.filter(p => p.types.includes(type))) 
            }
        } 
        setSelectedTypes(selectedTypes)
    }

    const handleFilterByOrigin = (newOrigin) => {
        if (newOrigin === 'original') {
            setFiltered(pokemons)
            setRender(true)
        } else {
            setFiltered(pokemonsCreated)
            setRender(true)
        }
    }

    const handleOrderAscByAttack = () => {
        setFiltered(filtered.sort(function(a,b) {
            if(a.attack < b.attack) return -1;
            if(a.attack > b.attack) return 1;
            return 0
        }))
        setRender(true)
    }

    const handleOrderDescByAttack = () => {
        setFiltered(filtered.sort(function(a,b) {
            if(b.attack < a.attack) return -1;
            if(b.attack > a.attack) return 1;
            return 0
        }))
        setRender(true)
    }

    const handleOrderAscByName = () => {
        setFiltered(filtered.sort(function(a,b) {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0
        }))
        setRender(true)
    }

    const handleOrderDescByName = () => {
        setFiltered(filtered.sort(function(a,b) {
            if(b.name < a.name) return -1;
            if(b.name > a.name) return 1;
            return 0
        }))
        setRender(true)
    }
        
    const slicedPokemons = () => {
        console.log(pokemonsCreated)
        if(pokemonCard.length > 0) return pokemonCard;
        if(filtered === pokemonDetail) setFiltered(pokemons);
        if(Array.isArray(pokemons)) {
            return filtered.slice(currentPage, currentPage + 12)
        } else {
            pokemons = [pokemons]
            return pokemons
        }
    }

    if (render === true) {
        slicedPokemons()
        setRender(false)
    }

    const nextPage = () => {
        if (filtered.length > currentPage + 4)
        setCurrentPage(currentPage + 12)
    }
    
    const prevPage = () => {
        if (currentPage > 0)
        setCurrentPage(currentPage - 12)
    }

    return (
        <div className="home">
            <div className="column-left">
                    {types && <Filters types={types} handleFilterByTypes={handleFilterByTypes} handleFilterByOrigin={handleFilterByOrigin}/>}
            </div>
            <div className="home-body">
                <div className="pokemons">
                    {(filtered.length===0)?
                    <Loader/>
                    :
                    slicedPokemons().map((p, i) => {
                        return (
                            <PokemonCard
                        key={i}
                        name={p.name}
                        image={p.image}
                        types={p.types}
                        id={p.id}
                        addCapture={addCapture}
                        />)})}
                </div>
                <div className="footer">
                    <button className="pagination" onClick={() => prevPage()}>Anteriores</button>
                    <button className="pagination" onClick={() => nextPage()}>Siguientes</button>
                </div>
            </div>
            <div className="column-right">
                <Sorters handleOrderAscByName={handleOrderAscByName} handleOrderDescByName={handleOrderDescByName} handleOrderAscByAttack={handleOrderAscByAttack} handleOrderDescByAttack={handleOrderDescByAttack}/>
            </div>
        </div>
    )
}

const MapStateToProps = (state) => {
    return {
        pokemons: state.pokemons,
        pokemonsCreated: state.pokemonsCreated,
        pokemonCard: state.pokemonCard,
        pokemonDetail: state.pokemonDetail,
        types: state.types
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        getAllPokemons: () => dispatch(getAllPokemons()),
        getAllTypes: () => dispatch(getAllTypes()),
        addCapture: (name) => dispatch(addCapture(name)),
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Pokemons);            //me genera UNA NUEVA función getPokemons (que en clases va con this) y estoy exportando el componente ya inyectándole las propiedades
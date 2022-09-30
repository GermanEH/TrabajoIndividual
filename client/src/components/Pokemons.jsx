import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import PokemonCard from "./PokemonCard.jsx";
// import Checkbox from './Checkbox.jsx'
import Loader from './Loader.jsx'
// import Message from './Message.jsx'
import './Pokemons.css' 
import { getAllPokemons, getAllTypes, filterPokemons, addCapture, } from '../redux/actions/index.js'
import logo from '../assets/TfCK.gif'

const Pokemons = ({getAllPokemons, getAllTypes,
    filterPokemons, pokemons, types, addCapture}) => {            //hice destructuring porque me lo recomendaba el comment al useEffect (estaba teniendo un loop infinito)

    const [filtered, setFiltered] = useState([])
    const [render, setRender] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedTypes, setSelectedTypes] = useState(new Set())
    // const [error, setError] = useState(null)
    // const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getPokemons = async () => {await getAllPokemons()}; 
        getPokemons();
    }, [])
    useEffect(() => {setFiltered(pokemons)}, [pokemons])
    useEffect(() => {getAllTypes()}, [])

    //me traigo el array de types
    //declaro un set
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
            let filterPokemons = filtered.filter(p => p.id < 950)
            setFiltered(filterPokemons)
            setRender(true)
        } else {
            let filterPokemons = filtered.filter(p => p.id > 950)
            setFiltered(filterPokemons)
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
        return filtered.slice(currentPage, currentPage + 12)
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

    // <Checkbox toggleTypes={(type) => handleFilterByTypes(type.name)} type={type.name} key={i}/>


    // {error && <Message />}

    return (
        <div className="home">
            <div className="column-left">
                    <h3>Filtrar por...</h3>
                    <h4>Tipos</h4>
                <div className="types">
                    {(types?.map((type, i) => <div className="type"><input type="checkbox" onChange={() => handleFilterByTypes(type.name)} key={i}></input>{type.name}</div>))}
                </div>
                    <h4>Origen</h4>
                    <div className="origin">
                        <button onClick={() => handleFilterByOrigin ('original')} key={1}>original</button>
                        <button onClick={() => handleFilterByOrigin ('created')} key={2}>created</button>
                    </div>
            </div>
            <div className="home-body">
                <div className="pokemons">
                    {(filtered.length===0)?
                    <div>
                        <img src={logo} alt="loading..." widht="150" height="150"/>
                        <br></br>
                        <p>Cargando...</p>
                    </div>
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
        types: state.types
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        getAllPokemons: () => dispatch(getAllPokemons()),
        getAllTypes: () => dispatch(getAllTypes()),
        addCapture: (name) => dispatch(addCapture(name)),
        filterPokemons: (filters) => dispatch(filterPokemons(filters))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Pokemons);            //me genera UNA NUEVA función getPokemons (que en clases va con this) y estoy exportando el componente ya inyectándole las propiedades
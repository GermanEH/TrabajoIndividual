import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Filters from '../renders/Filters.jsx'
import Sorters from '../renders/Sorters.jsx'
import Loader from '../renders/Loader.jsx'
import PokemonCard from '../renders/PokemonCard';
import { getAllTypes, removeCapture } from '../../redux/actions/index.js'

const Pokebola = ({ pokemonsCaptured, getAllTypes, removeCapture, types }) => {

    const [filtered, setFiltered] = useState([])
    const [render, setRender] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedTypes, setSelectedTypes] = useState(new Set())
    // const [error, setError] = useState(null)
    const [capturedForFilter, setCapturedForFilter] = useState([])

    useEffect(() => {setCapturedForFilter(pokemonsCaptured)}, [])
    useEffect(() => {setFiltered(pokemonsCaptured)}, [pokemonsCaptured])
    useEffect(() => {getAllTypes()}, [])

    const handleFilterByTypes = (typeName) => {
        if (selectedTypes.has(typeName)) {
            setSelectedTypes(selectedTypes.delete(typeName))
            if(selectedTypes.size > 0) {
                for (const type of selectedTypes) {
                    setFiltered(pokemonsCaptured.filter(p => p.types.includes(type)))
                }
            } else { 
                    return capturedForFilter}
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
                        removeCapture={removeCapture}
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
        pokemonsCaptured: state.pokemonsCaptured,
        types: state.types
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        getAllTypes: () => dispatch(getAllTypes()),
        removeCapture: (name) => dispatch(removeCapture(name)),
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Pokebola);
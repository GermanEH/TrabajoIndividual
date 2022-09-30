import React, {useState} from 'react';
import { createPokemon, getAllPokemons, getAllTypes, addCapture } from '../../redux/actions'
import './NewPokemon.css'
// import Validate, {setErrors} from './Validations.jsx'
import { connect } from "react-redux";
import { useEffect } from 'react';
import logo from '../../assets/Ash_Ketchum_BW.webp'

const NewPokemon = ({ createPokemon, getAllTypes, getAllPokemons, addCapture, types, pokemons }) => {
    const initialForm = {
        image:'',
        name:'',
        id:0,
        hp:0,
        attack:0,
        defense:0,
        speed:0,
        weight:0,                  
        height:0,
        types: new Set()
    }
    const [input, setInput] = useState(initialForm)
    const [selectedTypes, setSelectedTypes] = useState(new Set())
    const [idsExistentes, setIdsExistentes] = useState([])
    const [namesExistentes, setNamesExistentes] = useState([])
    const [errors, setErrors] = useState({})

    useEffect(() => {const getPokemons = async () => {await getAllPokemons()}; getPokemons()}, [])
    useEffect(() => {const getTypes = async () => {await getAllTypes()}; getTypes()}, [])

    let ids = []
    let getIds = (pokemons) => {
        for (const pokemon of pokemons) {
            ids.push(pokemon.id)
        } 
        return ids
    }
    let names = []
    let getNames = (pokemons) => {
        for (const pokemon of pokemons) {
            names.push(pokemon.name)
        } 
        return names
    }

    useEffect(() => {const ids = getIds(pokemons); setIdsExistentes(ids)}, [pokemons])
    useEffect(() => {const names = getNames(pokemons); setNamesExistentes(names)}, [pokemons])

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const validationForm = (input) => {
        let errors = {}         //lo ideal es que pase vacío: porque cuando tenga una prop, es que hubo un error
        if(!input.name.trim()) {
            errors.name = "El nombre es requerido"  //lleno el obj con props cuyo nombre es el mismo del input
        } else if (input.name.match(/\d/g)) {
            errors.name = "El nombre no puede contener números"
        } else if (namesExistentes.includes(input.name)) {
            errors.name = "Nombre existente"
        }
        let id = 950
        id++
        if(!input.id) {
            errors.id = "El id es requerido"
        } else if (idsExistentes.includes(parseInt(input.id)) || input.id < id) {
            errors.id = `Id existente (debe ser mayor a ${id})`
        }
        if(input.hp < 1 || input.attack > 1000 || input.hp.match(/[a-b]/i)){
            errors.hp = "Puntos de golpe inválidos (debe ser entre 1 y 1000)"
        }
        if(input.attack < 1 || input.attack > 1000 || input.attack.match(/[a-b]/i)){
            errors.attack = "Ataque inválido (debe ser entre 1 y 1000)"
        }
        if(input.defense < 1 || input.defense > 1000 || input.defense.match(/[a-b]/i)){
            errors.defense = "Defensa inválida (debe ser entre 1 y 1000)"
        }
        if(input.speed < 1 || input.speed > 1000 || input.speed.match(/[a-b]/i)){
            errors.speed = "Velocidad inválida (debe ser entre 1 y 1000)"
        }
        if(input.height < 1 || input.height > 1000 || input.height.match(/[a-b]/i)){
            errors.height = "Altura inválida (debe ser entre 1 y 1000)"
        }
        if(input.weight < 1 || input.weight > 1000 || input.weight.match(/[a-b]/i)){
            errors.weight = "Peso inválido (debe ser entre 1 y 1000)"
        }
        // if(input.types.size === 0) {
        //     errors.types = "Se requiere al menos un type"
        // }
    return errors
    }
    const handleBlur = (e) => {
        handleInputChange(e)
        setErrors(validationForm(input))
    }
    
    const handleTypeSelect = function (typeId) {
        if(selectedTypes.has(typeId)) {
            setSelectedTypes(selectedTypes.delete(typeId))} else {
                setSelectedTypes(selectedTypes.add(typeId))
                
            } 
        setSelectedTypes(selectedTypes)
    }

    const handleSubmit = (e) => {
        setInput(input.types=selectedTypes)
        e.preventDefault();
        if(!input.types) {
            alert("Se requiere al menos un type")
            return
        }
        createPokemon(input);
        alert("Pokemón creado exitosamente")
        // Validate({                //si le paso solo input, el asincronismo va a impedir que tenga el valor inmediatamente, va a estar siempre un paso atrás
        // ...input,                   
        // [e.target.name]: e.target.value
        // })
        setInput(initialForm)
    }

    return (
    <div className="newPokemon">
        <div className="column-left">
            <img src={logo} alt="Ash Ketchum" width="300" height="500"></img>
        </div>
        <form className="form" onSubmit={handleSubmit}>
            <div className="red_table">
                <div className="pokemonItem">
                    <label htmlFor="image">Image</label>
                    <input 
                    type="url"                      
                    name="image"
                    placeholder="Image..."
                    value={input.image}
                    onBlur={handleBlur}
                    onChange={handleInputChange}/>
                </div>
                <div className="empty"></div>
                <div className="pokemonItem">
                    <label htmlFor="name">Name:</label>
                    <input  
                    type="text"
                    name="name"
                    placeholder="Name..."
                    value={input.name}
                    onBlur={handleBlur}
                    onChange={handleInputChange}/>
                </div>
                <div className="empty"></div>
                {errors.name && <p className="validator">{errors.name}</p>}
                <div className="pokemonItem">
                    <label htmlFor="id">id:</label>
                    <input 
                    type="number"                       
                    name="id"
                    placeholder="id..."
                    value={input.id}
                    onBlur={handleBlur}
                    onChange={handleInputChange}/>
                </div>
                <div className="empty"></div>
                {errors.id && <p className="validator">{errors.id}</p>}
                <div className="pokemonItem">
                    <label htmlFor="hp">Hp:</label>
                    <input 
                    type="number"
                    name="hp"
                    placeholder="Hp..."
                    value={input.hp}
                    onBlur={handleBlur}
                    onChange={handleInputChange}/>
                </div>
                <div className="empty"></div>
                {errors.hp && <p className="validator">{errors.hp}</p>}
                <div className="pokemonItem">
                    <label htmlFor="attack">Attack:</label>
                    <input 
                    type="number"
                    name="attack"
                    placeholder="Attack..."
                    value={input.attack}
                    onBlur={handleBlur}
                    onChange={handleInputChange}/>
                </div>
                <div className="empty"></div>
                {errors.attack && <p className="validator">{errors.attack}</p>}
                <div className="pokemonItem">
                    <label htmlFor="defense">Defense:</label>
                    <input 
                    type="number"
                    name="defense"
                    placeholder="Defense..."
                    value={input.defense}
                    onBlur={handleBlur}
                    onChange={handleInputChange}/>
                </div>
                <div className="empty"></div>
                {errors.defense && <p className="validator">{errors.defense}</p>}
                <div className="pokemonItem">
                    <label htmlFor="speed">Speed:</label>
                    <input 
                    type="number"
                    name="speed"
                    placeholder="Speed..."
                    value={input.speed}
                    onBlur={handleBlur}
                    onChange={handleInputChange}/>
                </div>
                <div className="empty"></div>
                {errors.speed && <p className="validator">{errors.speed}</p>}
                <div className="pokemonItem">
                    <label htmlFor="height">Height:</label>
                    <input 
                    type="number"
                    name="height"
                    placeholder="Height..."
                    value={input.height}
                    onBlur={handleBlur}
                    onChange={handleInputChange}/>
                </div>
                <div className="empty"></div>
                {errors.height && <p className="validator">{errors.height}</p>}
                <div className="pokemonItem">
                    <label htmlFor="weight">Weight:</label>
                    <input 
                    type="number"
                    name="weight"
                    placeholder="Weight..."
                    value={input.weight}
                    onBlur={handleBlur}
                    onChange={handleInputChange}/>
                </div>
                <div className="empty"></div>
                {errors.weight && <p className="validator">{errors.weight}</p>}
                <div className="pokemonItem">
                    <label htmlFor="types">Types:</label>
                </div>
            </div>
                <div className="types">
                {(types?.map((type, i) => <div className="type">
                    <input 
                    type="checkbox" 
                    name="types"
                    onBlur={handleBlur}
                    onChange={() => handleTypeSelect(type.id)}
                    key={i}
                    >
                    </input>{type.name}
                    </div>))}
                </div>
                {errors.types && <p className="validator">{errors.types}</p>}
                <div className="pokemonItem">
                    <button type="submit" disabled={Object.keys(errors).length} className={Object.keys(errors).length ? "button-disabled" : "button"}>Crear Pokemón</button>
                </div>
    </form>
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
        createPokemon: (pokemon) => dispatch(createPokemon(pokemon)),
        getAllPokemons: () => dispatch(getAllPokemons()),
        getAllTypes: () => dispatch(getAllTypes()),
        addCapture: (name) => dispatch(addCapture(name)),
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(NewPokemon);   
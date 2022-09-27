import React, {useState} from 'react';
import * as ReactRedux from "react-redux";
import { createPokemon } from '../redux/actions'
import './NewPokemon.css'
import Validate, {setErrors} from './Validations.jsx'

const NewPokemon = () => {
    const [input, setInput] = useState({
        image:'',
        name:'',
        id:'',
        attack:'',
        defense:'',
        speed:'',
        weight:'',                  //chequear esto de las comillas (son enteros)
        height:''
    })

    const dispatch = ReactRedux.useDispatch()

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPokemon(input))
        Validate({                //si le paso solo input, el asincronismo va a impedir que tenga el valor inmediatamente, va a estar siempre un paso atrás
        ...input,                   
        [e.target.name]: e.target.value     //esto se llama DINAMIC PROPS
    })
    }
    //LE SAQUÉ SETERRORS antes del validate

    return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>Image</label>
            <input 
            type="url"                      //ESTA BIEN?
            name="image"
            placeholder="Image..."
            value={input.image}
            onChange={handleInputChange}/>
        </div>
        <div>
            <label>Name:</label>
            <input  
            type="text"
            name="name"
            placeholder="Name..."
            value={input.name}
            onChange={handleInputChange}/>
        </div>
        <div>
            <label>id:</label>
            <input 
            type="number"                       //AGREGAR VALIDACIONES DE CANT DE DIGITOS Y DE NEGATIVOS
            name="id"
            placeholder="id..."
            value={input.id}
            onChange={handleInputChange}/>
        </div>
        <div>
            <label>Attack:</label>
            <input 
            type="number"
            name="attack"
            placeholder="Attack..."
            value={input.attack}
            onChange={handleInputChange}/>
        </div>
        <div>
            <label>Defense:</label>
            <input 
            type="number"
            name="defense"
            placeholder="Defense..."
            value={input.defense}
            onChange={handleInputChange}/>
        </div>
        <div>
            <label>Speed:</label>
            <input 
            type="number"
            name="speed"
            placeholder="Speed..."
            value={input.speed}
            onChange={handleInputChange}/>
        </div>
        <div>
            <label>Height:</label>
            <input 
            type="number"
            name="height"
            placeholder="Height..."
            value={input.height}
            onChange={handleInputChange}/>
        </div>
        <div>
            <label>Weight:</label>
            <input 
            type="number"
            name="weight"
            placeholder="Weight..."
            value={input.weight}
            onChange={handleInputChange}/>
        </div>
        <div>
            <input type="submit" value="Agregar"/>
        </div>
    </form>
    )
}

export default NewPokemon;
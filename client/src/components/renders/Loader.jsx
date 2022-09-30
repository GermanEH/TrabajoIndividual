import React from 'react';
// import 'Loader.css'
import logo from '../../assets/TfCK.gif'

const Loader = () => {
    return (
        <div>
            <img src={logo} alt="loading..." widht="150" height="150"/>
            <br></br>
            <p>Cargando...</p>
        </div>
    )
}

export default Loader;
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
import SearchBar from './SearchBar.jsx';

export default function NavBar({onSearch}) {
    return (
        <nav className='nav-bar'>
            <Link to ='/home' style={{ textDecoration: 'none', color:'white'}}>Home</Link>
            <Link to ='/pokemon/create' style={{ textDecoration: 'none', color:'white'}}>Create New Pokemon</Link>
            <Link to ='/pokebola' style={{ textDecoration: 'none', color:'white'}}>Pokebola</Link>
            <SearchBar />
        </nav>
    )
}

/*  */

//AGREGARLE ESTILOS A NAVLINK
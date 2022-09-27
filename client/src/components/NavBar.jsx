import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
import SearchBar from './SearchBar.jsx';

export default function NavBar({onSearch}) {
    return (
        <nav className='nav-bar'>
            <Link to ='/home' style={{ textDecoration: 'none' }}>Home</Link>
            <Link to ='/pokemon/create' style={{ textDecoration: 'none' }}>Create New Pokemon</Link>
            <SearchBar />
        </nav>
    )
}

/*  */

//AGREGARLE ESTILOS A NAVLINK
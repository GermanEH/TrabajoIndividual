import React from 'react'; 

function Checkbox(props) { 

    const toggleTypes = props.toggleTypes; 
    const type = props.type; 
    
    const handleChange = () => { 

    toggleTypes(type); 
    
    }; 
    
    return ( 
    <div><input type="checkbox" onChange={handleChange}/>{type}</div>
    ); 
}; 


export default Checkbox;
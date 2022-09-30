import React from 'react';
// import './Filter.css' 

const Filters = ({types, handleFilterByTypes, handleFilterByOrigin}) => {

    return (
        <div>
            <h3>Filtrar por...</h3>
                    <h4>Tipos</h4>
                <div className="types">
                    {(types?.map((type, i) => <div className="type" key={i}><input type="checkbox" onChange={() => handleFilterByTypes(type.name)} key={i}></input>{type.name}</div>))}
                </div>
                    <h4>Origen</h4>
                    <div className="origin">
                        <button onClick={() => handleFilterByOrigin ('original')} key={1}>original</button>
                        <button onClick={() => handleFilterByOrigin ('created')} key={2}>created</button>
                    </div>
        </div>
        
    )
}

export default Filters;
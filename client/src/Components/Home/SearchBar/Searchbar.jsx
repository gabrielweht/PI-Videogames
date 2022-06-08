import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from '../../../Actions/index'

export default  function SearchBar(){
    const [ search, setSearch ] = useState('');
    let dispatch = useDispatch();

    function searchName (e){
        e.preventDefault();
        dispatch(getVideogamesByName(search));
    }
    function changeSearch(e){
        setSearch(e.target.value);
    }

    return (
        <div>
            <form onSubmit={searchName}>
                <input type="text" placeholder="Buscar..." value={search} onChange={changeSearch}/>
                <input type='submit' value='Buscar'/>
            </form>
        </div>
    )
}
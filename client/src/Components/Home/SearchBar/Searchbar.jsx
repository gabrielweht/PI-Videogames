import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from '../../../Actions/index'
import styles from './searchBar.module.css'

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
        <div className={styles.searchBar}>
            <form >
                <input type="text" placeholder="Search..." 
                className={styles.input}
                value={search} onChange={changeSearch}/>
                <button onClick={searchName} className={styles.lupa}/>
            </form>
        </div>
    )
}
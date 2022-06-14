import React from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Pagination from "./Pagination/Pagination";

export default function Videogames (props){  
    let history = useHistory();

    const redirect = () => {
        history.push('/videogame/create')
    }

    return (
        <div>
            <NavBar />
            <Pagination props={props}/>
            <button onClick={redirect}>
                Add new Game
            </button>
        </div>
    )
}

import React from "react";
import NavBar from "../NavBar/NavBar";
import Pagination from "./Pagination/Pagination";

export default function Videogames (props){
    return (
        <div>
            <NavBar />
            <Pagination props={props}/>
        </div>
    )
}

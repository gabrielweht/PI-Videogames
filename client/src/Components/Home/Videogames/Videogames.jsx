import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames } from "../../../Actions";
import NavBar from "../NavBar/NavBar";
import Pagination from "./Pagination/Pagination";
import Videogame from "./Videogame";
import styles from './videogame.module.css'

export default function Videogames (){
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])
    return (
        <div>
            <NavBar />
            <Pagination />
        </div>
    )
}

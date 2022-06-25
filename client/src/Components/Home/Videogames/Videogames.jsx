import React from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Pagination from "./Pagination/Pagination";
import styles from './videogame.module.css'

export default function Videogames (){  
    let history = useHistory();

    const redirect = () => {
        history.push('/videogame/create')
    }

    return (
            <div className={styles.bgr}>
                <NavBar />
                <Pagination />
                <button onClick={redirect} className={styles.btn}>
                    Add new Game
                </button>
                <footer></footer>
            </div>
    )
}

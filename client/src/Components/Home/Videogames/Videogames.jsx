import React from "react";
import NavBar from "../NavBar/NavBar";
import Pagination from "./Pagination/Pagination";
import styles from './videogame.module.css'

export default function Videogames (){

    

    return (
            <div className={styles.bgr}>
                <NavBar />
                <Pagination />
                <footer>
                </footer>
            </div>
    )
}

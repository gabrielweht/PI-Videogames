import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVideogames } from "../../../../Actions"
import Videogame from "../Videogame"
import styles from '../videogame.module.css'

export default function Pagination (){
    let videogames = useSelector((state) => state.videogamesLoaded)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])
    const [ currentPage, setCurrentPage ] = useState(0)
    const [ videogamePerPage, setVideogamePerPage ] = useState(videogames.slice(0, 15))
    const [ firstValue, setFirstValue ] = useState(0)
    
    useEffect(() => {
        setFirstValue(currentPage * 15)
        setVideogamePerPage(videogames.slice(firstValue, firstValue + 15))
    }, [currentPage, firstValue, videogames])

    function handleFirst(){
        setCurrentPage(0)
    }

    function handleNext(){
        if(currentPage === Math.floor(videogames.length / 15)) return;
        setCurrentPage(currentPage + 1)
    }
    function handlePrev(){
        if(currentPage === 0) return;
        setCurrentPage(currentPage - 1)
    }
    
    
    function handleLast(){
        setCurrentPage(Math.floor(videogames.length / 15))

    }

    function handleNumber(e){
        setCurrentPage(e.target.value - 1)
    }

    function createButton(){
        let btn = []
        for(var i = 1; i <= Math.ceil((videogames.length - 1) / 15); i++){
                btn.push(<button key={i} value={i} onClick={handleNumber}>{i}</button>)
        }
        return btn
    }

    return (
        <div className={styles.cards}>
                {videogamePerPage.length > 0 ? videogamePerPage.map((videogame, index) => {
                    return (<Videogame
                        key={index} 
                        id= {videogame.id}
                        name = {videogame.name}
                        image = {videogame.background_image}
                        genres = {videogame.genres}
                    />
                    )
                }) : <div> Cargando... </div>
                }
                {videogamePerPage.length > 0 ? <nav className="navPag">
                    <button onClick={handleFirst}>First</button>
                    <button onClick={handlePrev}>Previous</button>
                    {createButton().map(el => el)}
                    <button onClick={handleNext}>Next</button>
                    <button onClick={handleLast}>Last</button>
                </nav>
                : <div></div>}
            </div>
    )
}
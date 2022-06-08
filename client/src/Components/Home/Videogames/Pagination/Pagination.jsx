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
    const [index, setIndex] = useState(0)

    function handleFirst(){
        setIndex(0)
    }

    function handleNext(){
        setIndex(index + 1)
    }
    function handlePrev(){
        setIndex(index - 1)
    }
    
    
    function handleLast(){
        setIndex(videogames.length - 1)
    }


    return (
        <div className={styles.cards}>
                {videogames.length > 0 ? videogames[index].map((videogame, index) => {
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
                {videogames.length > 0 ? <nav>
                    <button onClick={handleFirst}>First</button>
                    <button onClick={handlePrev}>Previous</button>
                    {}
                    <button onClick={handleNext}>Next</button>
                    <button onClick={handleLast}>Last</button>
                </nav>
                : <div></div>}
            </div>
    )
}
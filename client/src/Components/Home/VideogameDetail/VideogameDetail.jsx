import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import details from './details.module.css'


export default function VideogameDetail(){
    const {id} = useParams()
    const [ game, setGame ] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:3001/videogame/${id}`)
        .then((response) => {
            setGame(response.data)

            return () => {
                setGame(null)
            }
        })
    }, [id])

    return (<div>
        {game ? <div>
        <h1>{game.name}</h1>
        <img className={details.image} src={game.background_image} alt='imagen' />
        <ul>
            genres:
            {game.genres?.map((g, index) => {
                return <li key={index}>{g}</li>
            })}
        </ul>
        <p dangerouslySetInnerHTML={{__html: game.description}}/>
        <p>{game.released}</p>
        <p>{game.rating}</p>
        <ul>
            platforms:
            {game.platforms?.map((p, index) => {
                return <li key={index}>{p}</li>
            })}
        </ul>
    </div> : <div>Cargando...</div>}
    </div>)
} 
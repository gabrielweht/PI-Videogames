import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import Loading from "../../Loading/Loading"
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

    let history = useHistory();

    const redirect = () => {
        history.push('/videogames')
    }

    return (<div className={details.bgr}>
        <button 
        className={details.btn}
        onClick={redirect}> 
            {'< '}  Back to Home
        </button>
        
        {game ? <div className={details.detail}>
        <div
        className={
            game.rating >= 3 ? details.ratingUp : game.rating >= 2 ? details.ratingMid : details.ratingLow
            }>
            <div>Rating</div>
            <div>{game.rating}</div>
        </div>
        <h1 className={details.title}>{game.name}</h1>
        <div className={details.grid}>
            <img className={details.image} src={game.background_image} alt='imagen' />
            <div className={details.det}>
                <ul className={details.genres}>
                    GENRES
                    <div className={details.genresLi}>
                        {game.genres?.map((g, index) => <li key={index}>{g}</li>)}
                    </div>
                </ul>
                <ul className={details.platforms}>
                    PLATFORMS
                    <div className={details.platformsLi}>
                        {game.platforms?.map((pl, index) => <li key={index}>{pl}</li>)}
                    </div>
                </ul>
                <div className={details.released}>
                    <div >RELEASED</div>
                    <div>{game.released}</div>
                </div>
            </div>
        </div>
        <div className={details.description}>
            <div className={details.descriptionDiv}>DESCRIPTION</div>
            <p dangerouslySetInnerHTML={{__html: game.description}}/>
        </div>
        </div>
        : <Loading />}
    
    </div>)
} 
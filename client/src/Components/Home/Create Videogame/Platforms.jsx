import { useEffect } from "react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../../Actions";
import platform from './platform.module.css'

export default function Platforms({active, setActive, handleClick}){
    const videogames = useSelector(state => state.videogames)
    const platforms = []
    const [ platformsSelected, setPlatfomsSelected ] = useState([])

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])
    
    videogames.forEach((el) => {
        el.platforms.forEach(pl => {
            if(!platforms.includes(pl)) platforms.push(pl)
        })
    })

    const pushPlatform = useCallback((e) => {
        if(e.target.checked) setPlatfomsSelected([...platformsSelected, e.target.value])
        else {
            const deletePlatform = platformsSelected.filter(el => el !== e.target.value)
            setPlatfomsSelected(deletePlatform)
        }
    }, [platformsSelected])

    function addPlatforms(e){
        e.preventDefault()
        handleClick(platformsSelected, 'platforms')
        setActive(!active)
    }

    return (
        <>
            {
                active && 
                <div className={platform.container}>
                    <div className={platform.card}>
                        <button onClick={() => setActive(!active)}>X</button>
                        <br/>
                        {platforms.map((plat, index) => {
                        return (<label><input 
                            type='checkbox'
                            key={index}
                            value={plat}
                            onClick={pushPlatform}
                        />{plat}</label>)})}
                        <br/>
                        <button onClick={addPlatforms}>Agregar Plataformas</button>
                    </div>
                </div>
            }
        </>
    )
}
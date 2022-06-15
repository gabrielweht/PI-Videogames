import { useEffect } from "react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../../Actions";
import platform from './modal.module.css'

export default function Platforms({active, setActive, handleClick, platformSelected}){
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
        platforms.sort((a, b) =>{
            let NameA = a.toLowerCase()
            let NameB = b.toLowerCase()
            if (NameA > NameB) {
                return 1 
            }
            if (NameA < NameB) {
                return -1
            }
            return 0;
        })
    })

    const isCheck = useCallback((plat)=>{
        if (platformSelected.length){
            var check  = platformSelected.includes(plat)
        }
        return check
    },[platformSelected]) 

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
                        return (<label key={index}><input 
                            type='checkbox'           
                            value={plat}
                            onClick={pushPlatform}
                            defaultChecked={isCheck(plat)}
                        />{plat}</label>)})}
                        <br/>
                        <button onClick={addPlatforms}>Listo</button>
                    </div>
                </div>
            }
        </>
    )
}
import { useEffect } from "react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../../Actions";
import platform from './modal.module.css'

export default function Platforms({active, setActive, handleClick, platformSelected}){
    const videogames = useSelector(state => state.videogames)
    let platforms = []
    const [ platformsSelected, setPlatfomsSelected ] = useState([])
    const [ newPlatform, setNewPlatform ] = useState('')

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])
    
    videogames.forEach((el) => {
        el.platforms.forEach(pl => {
            if(!platforms.includes(pl)) platforms.push(pl)
        })
    })

    platformSelected?.forEach(pl => {
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

    function pushNewPlatform (e) {
        e.preventDefault()
        if(newPlatform === '') return;
        if(!platformsSelected.includes(newPlatform)) {
            setPlatfomsSelected([...platformsSelected, newPlatform])
            setNewPlatform('')
        }
    }

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
                        <button 
                            className={platform.btnX}
                            onClick={() => setActive(!active)}>X</button>
                        <h4 className={platform.title}>SELECT PLATFORMS</h4>
                        <hr/>
                            <div className={platform.divPlat}>
                                {platforms.map((plat, index) => {
                                return (<label key={index}><input 
                                    type='checkbox'           
                                    value={plat}
                                    onClick={pushPlatform}
                                    defaultChecked={isCheck(plat)}
                                />{plat}</label>)})}
                            </div>
                            <div className={platform.divInput}>
                                <input 
                                className={platform.input}
                                type='text' value={newPlatform} onChange={(e) => setNewPlatform(e.target.value)} placeholder='Escribe una plataforma'/>
                                <button 
                                className={platform.btnAdd}
                                onClick={pushNewPlatform}>Agregar Plataforma</button>
                            </div>
                        <div className={platform.column}>
                            <button 
                            className={platform.btnSubmit}
                            onClick={addPlatforms}>
                                Listo
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
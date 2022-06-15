import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../../Actions";
import genre from './modal.module.css'

export default function Genres({ active, setActive, handleClick, genreSelected}){
    let genresLoaded = useSelector(state => state.genresLoaded)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    const [ genresSelected, setGenresSelected ] = useState([])
    
    const isCheck = useCallback((genre)=>{
        if (genreSelected.length){
            var check  = genreSelected.includes(genre)
        }
        return check
    },[genreSelected]) 

    const pushGenre = useCallback((e) => {
        if(e.target.checked) setGenresSelected([...genresSelected, e.target.value])
        else {
            const deleteGenre = genresSelected.filter(el => el !== e.target.value)
            setGenresSelected(deleteGenre)
        }
    }, [genresSelected])

    function addGenres(e){
        e.preventDefault()
        handleClick(genresSelected, 'genres')
        setActive(!active)
    }

    return (
    <>
        {
            active && 
            <div className={genre.container}>
                <div className={genre.card}>
                    <button onClick={() => setActive(!active)}>X</button>
                    <br/>
                    {genresLoaded.map((genre) => {
                    return (<label key={genre.id}>
                        <input 
                            type='checkbox'  
                            value={genre.name}
                            onClick={pushGenre}
                            defaultChecked={isCheck(genre.name)}
                    />{genre.name}</label>)})}
                    <br/>
                    <button onClick={addGenres}>Listo</button>
                </div>
            </div>
        }
    </>
    )

}
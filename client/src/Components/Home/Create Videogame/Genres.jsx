import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../../Actions";
import genre from './modal.module.css'

export default function Genres({ active, setActive, handleClick, genreSelected}){
    let genresLoaded = useSelector(state => state.genresLoaded)
    let genres = []
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    const [ genresSelected, setGenresSelected ] = useState([])
    const [ newGenre, setNewGenre ] = useState('')

    genresLoaded.forEach((genre) => {
        genres.push(genre.name)
    })
    
    genreSelected?.forEach((gen) => {
        if(!genres.includes(gen)) genres.push(gen)
    })

    genres.sort((a, b) =>{
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

    function pushNewGenre(e){
        e.preventDefault()
        if(!genresSelected.includes(newGenre)) {
            setGenresSelected([...genresSelected, newGenre])
            setNewGenre('')
        }
    }

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
                    <button 
                    className={genre.btnX}
                    onClick={() => setActive(!active)}>X</button>
                    <h4 className={genre.title}>SELECT GENRES</h4>
                    <hr/>
                    <div className={genre.divPlat}>
                        {genres.map((genre, index) => {
                        return (<label key={index}>
                            <input 
                                type='checkbox'  
                                value={genre}
                                onClick={pushGenre}
                                defaultChecked={isCheck(genre)}
                        />{genre}</label>)})}
                    </div>
                    <div className={genre.divInput}>
                        <input 
                        className={genre.input}
                        type='text' value={newGenre} onChange={(e) => setNewGenre(e.target.value)} placeholder='Escribe una plataforma'/>
                        <button 
                        className={genre.btnAdd}
                        onClick={pushNewGenre}>Agregar Género</button>
                    </div>
                    <div className={genre.column}>
                        <button 
                        className={genre.btnSubmit}
                        onClick={addGenres}>Listo</button>
                    </div>
                </div>
            </div>
        }
    </>
    )

}
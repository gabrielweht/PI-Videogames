import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { cleanUp, getVideogames, setCurrent} from "../../../../Actions"
import Loading from "../../../Loading/Loading"
import Videogame from "../Videogame"
import styles from '../videogame.module.css'

export default function Pagination (){
    let error = useSelector(state => state.errors)
    let videogames = useSelector((state) => state.videogamesLoaded)
    let current = useSelector((state) => state.current)
    let dispatch = useDispatch()

    console.log(videogames)
    let history = useHistory();

    const refresh = () => {
        history.push('/videogames')
    }

    const redirect = () => {
        history.push('/videogame/create')
    }

    useEffect(() => {
        dispatch(getVideogames())
        window.scroll(0, 0)
        return () => {
            dispatch(cleanUp())
        }
    }, [dispatch])

    
    const [ currentPage, setCurrentPage ] = useState(current)
    const [ videogamePerPage, setVideogamePerPage ] = useState(videogames.slice(current, current + 15))
    const [ firstValue, setFirstValue ] = useState(current)
    
    useEffect(() => {
        dispatch(setCurrent(currentPage))
        setFirstValue(currentPage * 15)
        setVideogamePerPage(videogames.slice(firstValue, firstValue + 15))
    }, [currentPage, firstValue, videogames, dispatch])

    function handleFirst(){
        
        setCurrentPage(0)
        window.scroll(0, 0)
    }

    function handleNext(){
        if(currentPage === Math.floor(videogames.length / 15)) return;
        setCurrentPage(currentPage + 1)
        window.scroll(0, 0)
    }

    function handlePrev(){
        if(currentPage === 0) return;
        setCurrentPage(currentPage - 1)
        window.scroll(0, 0)
    }
    
    
    function handleLast(){
        setCurrentPage(Math.floor(videogames.length / 15))
        window.scroll(0, 0)
    }

    function handleNumber(e){
        setCurrentPage(e.target.value - 1)
        window.scroll(0, 0)
    }

    function createButton(){
        let btn = []
        for(var i = 1; i <= Math.ceil((videogames.length - 1) / 15); i++){
                btn.push(<button
                    className={currentPage === i - 1 ? styles.btnPagActive : styles.btnPag} 
                    key={i} 
                    value={i} 
                    onClick={handleNumber}>{i}</button>)
        }
        return btn
    }
    
    return (
        <> {error ? <div className={styles.error}>
            <img 
            className={styles.imgError}
            alt='404 Error' 
            src='https://i.pinimg.com/originals/82/c6/6e/82c66e2672c795af6a7324d4b9c6e92e.png'/>
            <button 
            className={styles.btnRefresh}
            onClick={refresh}>
                Refresh
            </button>
        </div> :
            <>
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
                }) : <Loading/>
                }
                </div>
                {videogames.length > 15 ? <nav className={styles.navPag}>
                    <button 
                    className={styles.btnPag}
                    onClick={handleFirst}>{'<<'}</button>
                    <button 
                    className={styles.btnPag}
                    onClick={handlePrev}>{'<'}</button>
                    {createButton().map(el => el)}
                    <button 
                    className={styles.btnPag}
                    onClick={handleNext}>{'>'}</button>
                    <button 
                    className={styles.btnPag}
                    onClick={handleLast}>{'>>'}</button>
                </nav>
                : <></>}
                <button onClick={redirect} className={styles.btn}>
                    ADD NEW GAME
                </button>
                </>
            }
        </>        
    )
}
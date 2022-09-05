import { useState, useEffect } from "react"
import axios from 'axios'
import Platforms from "./Platforms"
import Genres from "./Genres"
import { ArraysComponents, FirstComponent, OtherComponents } from "./FormComponents"
import { useHistory } from "react-router-dom"
import styles from './createGames.module.css'
import Videogame from "../Videogames/Videogame"


export function validate(input){
    const reg_ex_url = /(http|https|ftp|ftps):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/
    const reg_ex_img = /.*(png|jpg|jpeg|gif)$/
    let date = new Date();
    let output = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getDate()).padStart(2, '0');
    let errors = {}
    if(!input.name) errors.name = 'El nombre del videojuego es obligatorio'
    if(!input.description) errors.description = 'Se necesita una descripción'
    if(!input.platforms.length) errors.platforms = 'Debe seleccionar al menos una plataforma'
    if(input.released > output) errors.released = 'La fecha de lanzamiento no puede ser posterior a la fecha actual'
    if(input.background_image){
        if(!reg_ex_url.test(input.background_image) || !reg_ex_img.test(input.background_image)) errors.image = 'El dato ingresado no coincide con el URL de una imagen'
    }
    if(input.rating > 5 || input.rating < 0) errors.rating = 'Debe ingresar un valor entre 0 y 5'
    return errors
}

export default function CreateGame(){
    const [ created, setCreated ] = useState('')
    const [newGame, setNewGame ] = useState({})
    const [ inputs, setInputs ] = useState({
        name: '',
        description: '',
        platforms: [],
        genres: [],
        released: undefined,
        rating: 0,
        background_image: ''
    })
    const [ warning, setWarning ] = useState('')
    const [ errors, setErrors ] = useState({})
    const [ platformActive, setPlatformActive ] = useState(false)
    const [ genreActive, setGenreActive ] = useState(false)

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    function handleInputChange(e){
        
        const newInput = {
            ...inputs,
            [e.target.name]: e.target.value
        }
        setInputs(newInput)
        setErrors({
            ...errors,
            [e.target.name]: undefined
        })
    }

    function handleArrays(arr, llave){
        
        const addArrays = {
            ...inputs,
            [ llave ]: arr
        }
        setInputs(addArrays)
        if(!arr.length){
            setErrors({
                ...errors,
                platforms: 'Debe seleccionar al menos una plataforma'
            })
        } else {
            setErrors({
                ...errors,
                platforms: undefined
            })
        }
    }

    async function postGame(e){
        e.preventDefault()
        setErrors(validate(inputs))
            try {          
                const response = await axios.post('https://api-videogames-pi.herokuapp.com//videogame', inputs)
                if(response.data) {
                    setNewGame(response.data.game)
                    setCreated(response.data.message)
                    setWarning('')
                    window.scroll(0, 0)
                }
            } catch (error) {
                setWarning(error.response.data)
            }
    }

    let history = useHistory();

    const redirect = () => {
        history.push('/videogames')
    }

    return (
        <>
            <button 
            className={styles.btnBack}
            onClick={redirect}> 
                {'< '}  Back to Home
            </button>

            <div className={styles.bgr}>
            {created ? 
                    <div className={styles.created}>
                        <div className={styles.message}>{created}</div> 
                        <Videogame 
                        id= {newGame.id}
                        name = {newGame.name}
                        image = {newGame.background_image}
                        />
                    </div>
                    :
                <div className={styles.component}>
                    <h1 className={styles.title}>
                        Creá tu juego
                    </h1>
                    {warning && <p className={styles.warning}>{warning}</p>} 
                    <p>Los campos con asterisco (*) son obligatorios</p>
                    <form 
                    className={styles.form}
                    onSubmit={postGame}>
                        <FirstComponent 
                            errors={errors}
                            handleChange={handleInputChange}
                        />
                        <ArraysComponents 
                            inputs={inputs}
                            errors={errors}
                            setPlatformActive={setPlatformActive}
                            platformActive={platformActive}
                            setGenreActive={setGenreActive}
                            genreActive={genreActive}
                        />
                        <OtherComponents 
                            errors={errors}
                            handleChange={handleInputChange}/>
                    </form>
                    <Platforms 
                        active={platformActive} 
                        setActive={setPlatformActive}
                        handleClick={handleArrays}
                        platformSelected={inputs.platforms}
                    />
                    <Genres 
                        active={genreActive} 
                        setActive={setGenreActive}
                        handleClick={handleArrays}
                        genreSelected={inputs.genres}
                    />
                </div>
                }
            </div>
        </>
    )
}
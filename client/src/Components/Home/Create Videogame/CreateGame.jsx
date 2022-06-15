import { useState } from "react"
import axios from 'axios'
import Platforms from "./Platforms"
import Genres from "./Genres"
import { ArraysComponents, FirstComponent, OtherComponents } from "./FormComponents"
import { useHistory } from "react-router-dom"


export function validate(input){
    let errors = {}
    if(!input.name) errors.name = 'El nombre del videojuego es obligatorio'
    if(!input.description) errors.description = 'Se necesita una descripción'
    if(!input.platforms.length) errors.platforms = 'Debe seleccionar al menos una plataforma'
    return errors
}

export default function PostGame(){
    const [ created, setCreated ] = useState('')
    const [ inputs, setInputs ] = useState({
        name: '',
        description: '',
        platforms: [],
        genres: [],
        released: undefined,
        rating: 1,
        background_image: ''
    })
    const [ warning, setWarning ] = useState('')
    const [ errors, setErrors ] = useState({})
    const [ platformActive, setPlatformActive ] = useState(false)
    const [ genreActive, setGenreActive ] = useState(false)

    function handleInputChange(e){
        const newInput = {
            ...inputs,
            [e.target.name]: e.target.value
        }

        setInputs(newInput)
    }

    function handleArrays(arr, llave){
        const addArrays = {
            ...inputs,
            [ llave ]: arr
        }
        setInputs(addArrays)
    }

    async function postGame(e){
        e.preventDefault()
        setErrors(validate(inputs))
            try {           
                const response = await axios.post('http://localhost:3001/videogame', inputs)
                if(response.data) {
                    setCreated(response.data)
                    setWarning('')
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
        <div>
            <h1>
                Creá tu juego
            </h1>
            {warning && <p>{warning}</p>}
            {created ? 
            <>
                <div>{created}</div> 
                <button onClick={redirect}>Ver Videojuegos</button>
            </>
            : 
            <form onSubmit={postGame}>
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
                <OtherComponents handleChange={handleInputChange}/>
            </form>}
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
    )
}
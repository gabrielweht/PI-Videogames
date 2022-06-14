import { useState } from "react"
import axios from 'axios'
import Platforms from "./Platforms"
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
                if(response.data) setCreated(response.data)
            } catch (error) {
                setWarning(error.response.data)
            }  
    }

    return (
        <div>
            <h1>
                Creá tu juego
            </h1>
            {warning && <p>{warning}</p>}
            {created ? <div>{created}</div> : <form onSubmit={postGame}>
                <div>
                    <label>Name*</label>
                    <input 
                    className={errors.name && 'danger'}
                    type='text' 
                    name='name' 
                    onChange={handleInputChange}
                    />
                    {errors.name && (<p className='danger'>{errors.name}</p>)}
                </div>
                <div>
                    <label>Description*</label>
                    <textarea  
                    className={errors.description && 'danger'}
                    name='description' 
                    onChange={handleInputChange}/>
                    {errors.description && (<p className='danger'>{errors.description}</p>)}
                </div>
                <div>
                    <button 
                        className={errors.platforms && 'danger'}
                        onClick={(e) => {
                            e.preventDefault()
                            setPlatformActive(!platformActive)}}>
                    Plataformas
                    </button>
                    {errors.platforms && (<p className='danger'>{errors.platforms}</p>)}
                </div>
                <div>
                    <label>Genres
                    <input
                        type='checkbox'    
                        name='genres'
                        value='Adventure'
                        onClick={handleArrays}/>Adventure
                    </label>
                </div>
                <div>
                    <label>Released</label>
                    <input 
                        type='date' 
                        name='released'
                        onChange={handleInputChange}
                        />
                </div>
                <div>
                    <label>Rating</label>
                    <input 
                        type='number' 
                        min='1' 
                        max='5' 
                        step='0.1' 
                        name='rating'
                        onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Imagen</label>
                    <input 
                        type='url' 
                        name='background_image'
                        onChange={handleInputChange}/>
                </div>
                <input type='submit' value='Crear Juego' />
            </form>}
            <Platforms 
                active={platformActive} 
                setActive={setPlatformActive}
                handleClick={handleArrays}
            />
        </div>
    )
}
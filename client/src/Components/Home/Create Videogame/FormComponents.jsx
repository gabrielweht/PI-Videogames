export function FirstComponent ({ errors, handleChange }){
    return (
        <>
            <div>
                <label>Name*</label>
                <input 
                    className={errors.name && 'danger'}
                    type='text' 
                    name='name' 
                    onChange={handleChange}
                />
                {errors.name && (<p className='danger'>{errors.name}</p>)}
            </div>
            <div>
                <label>Description*</label>
                <textarea  
                    className={errors.description && 'danger'}
                    name='description' 
                    onChange={handleChange}/>
                {errors.description && (<p className='danger'>{errors.description}</p>)}
            </div>
        </>
    )
}

export function ArraysComponents (params){
    const { inputs, errors, setPlatformActive, platformActive, setGenreActive, genreActive } = params
    return(
        <>
            <div>
                    <span>Plataforas*</span>
                    {inputs.platforms.length > 0 ? 
                    <>
                        {inputs.platforms.map((pl, index) => <span key={index}>{pl}</span>)}
                        <button 
                            className={errors.platforms && 'danger'}
                            onClick={(e) => {
                                e.preventDefault()
                                setPlatformActive(!platformActive)}}>
                        Editar
                        </button>
                    </>
                    : <button 
                        className={errors.platforms && 'danger'}
                        onClick={(e) => {
                            e.preventDefault()
                            setPlatformActive(!platformActive)}}>
                    Seleccionar
                    </button>}
                    {errors.platforms && (<p className='danger'>{errors.platforms}</p>)}
                </div>
                <div>
                    <span>Genres</span>
                    {inputs.genres.length > 0 ? 
                    <>
                        {inputs.genres.map((gen, index) => <span key={index}>{gen}</span>)}
                        <button 
                            onClick={(e) => {
                                e.preventDefault()
                                setGenreActive(!genreActive)}}>
                        Editar
                        </button>
                    </>
                    : <button 
                        onClick={(e) => {
                            e.preventDefault()
                            setGenreActive(!genreActive)}}>
                    Seleccionar
                    </button>}
                </div>
        </>
    )
}

export function OtherComponents ({handleChange}) {
    return (
        <>
            <div>
                <label>Released</label>
                <input 
                    type='date' 
                    name='released'
                    onChange={handleChange}
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
                    onChange={handleChange}/>
            </div>
            <div>
                <label>Imagen</label>
                <input 
                    type='url' 
                    name='background_image'
                    onChange={handleChange}/>
            </div>
            <input type='submit' value='Crear Juego' />
        </>
    )
}
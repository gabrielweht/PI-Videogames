import styles from './createGames.module.css'
import stylesLabels from './stylesLabels.module.css'


export function FirstComponent ({ errors, handleChange }){
    return (
        <>
            <div className={styles.divs}>
                <label className={errors.name ? stylesLabels.danger : stylesLabels.labels}>
                    <span className={stylesLabels.spans}>Name*</span>
                    <input 
                        onFocus={(e) => {
                            e.target.previousElementSibling.classList.add(stylesLabels.spansTop)
                            e.target.previousElementSibling.classList.add(stylesLabels.spansFocus)
                            e.target.parentNode.classList.add(stylesLabels.labelsFocus)
                        }}
                        onBlur= {(e) => {
                            if(e.target.value.trim().length === 0){
                                e.target.previousElementSibling.classList.remove(stylesLabels.spansTop)
                            }
                            e.target.previousElementSibling.classList.remove(stylesLabels.spansFocus)
                            e.target.parentNode.classList.remove(stylesLabels.labelsFocus)
                        }}
                        autoComplete='off'
                        className={stylesLabels.inputs}
                        type='text' 
                        name='name' 
                        onChange={handleChange}
                    />
                </label>
                {errors.name && (<p className={stylesLabels.dangerText}>{errors.name}</p>)}
            </div>
            <div className={styles.divs}>
                <label className={errors.description ? stylesLabels.danger : stylesLabels.labels}>
                    <span className={stylesLabels.spans}>Description*</span>
                    <textarea  
                        onFocus={(e) => {
                            e.target.previousElementSibling.classList.add(stylesLabels.spansTop)
                            e.target.previousElementSibling.classList.add(stylesLabels.spansFocus)
                            e.target.parentNode.classList.add(stylesLabels.labelsFocus)
                        }}
                        onBlur= {(e) => {
                            if(e.target.value.trim().length === 0){
                                e.target.previousElementSibling.classList.remove(stylesLabels.spansTop)
                            }
                            e.target.previousElementSibling.classList.remove(stylesLabels.spansFocus)
                            e.target.parentNode.classList.remove(stylesLabels.labelsFocus)
                        }}
                        className={stylesLabels.inputs}
                        rows="5" 
                        name='description' 
                        onChange={handleChange}/>
                </label>
                {errors.description && (<p className={stylesLabels.dangerText}>{errors.description}</p>)}
            </div>
            <div className={styles.divs}>
                <label className={errors.image ? stylesLabels.danger : stylesLabels.labels}>
                    <span className={stylesLabels.spans}>URL Image</span>
                    <input 
                        onFocus={(e) => {
                            e.target.previousElementSibling.classList.add(stylesLabels.spansTop)
                            e.target.previousElementSibling.classList.add(stylesLabels.spansFocus)
                            e.target.parentNode.classList.add(stylesLabels.labelsFocus)
                        }}
                        onBlur= {(e) => {
                            if(e.target.value.trim().length === 0){
                                e.target.previousElementSibling.classList.remove(stylesLabels.spansTop)
                            }
                            e.target.previousElementSibling.classList.remove(stylesLabels.spansFocus)
                            e.target.parentNode.classList.remove(stylesLabels.labelsFocus)
                        }}
                        className={stylesLabels.inputs}
                        autoComplete='off'
                        type='text' 
                        name='background_image'
                        onChange={handleChange}/>
                </label>
                {errors.image && (<p className={stylesLabels.dangerText}>{errors.image}</p>)}
            </div>
        </>
    )
}

export function ArraysComponents (params){
    const { inputs, errors, setPlatformActive, platformActive, setGenreActive, genreActive } = params
    return(
        <>
            <div className={styles.divArr}>
                    <div className={errors.platforms ? stylesLabels.dangerText : stylesLabels.platText}>Platforms*</div>
                    {inputs.platforms.length > 0 ? 
                    <>
                        <div className={styles.join}>{inputs.platforms.join(', ')}</div>
                        <button 
                            className={styles.btn}
                            onClick={(e) => {
                                e.preventDefault()
                                setPlatformActive(!platformActive)}}>
                        Edit
                        </button>
                    </>
                    : <button 
                        className={errors.platforms ? styles.btnDanger : styles.btn}
                        onClick={(e) => {
                            e.preventDefault()
                            setPlatformActive(!platformActive)}}>
                    Select
                    </button>}
                    {errors.platforms && (<p className={stylesLabels.dangerText}>{errors.platforms}</p>)}
                </div>
                <div className={styles.divArr}>
                    <div>Genres</div>
                    {inputs.genres.length > 0 ? 
                    <>
                        <div className={styles.join}>{inputs.genres.join(', ')}</div>
                        <button 
                            className={styles.btn}
                            onClick={(e) => {
                                e.preventDefault()
                                setGenreActive(!genreActive)}}>
                        Edit
                        </button>
                    </>
                    : <button 
                    className={styles.btn}
                        onClick={(e) => {
                            e.preventDefault()
                            setGenreActive(!genreActive)}}>
                    Select
                    </button>}
                </div>
        </>
    )
}

export function OtherComponents ({handleChange, errors}) {
    return (
        <>
            <div className={stylesLabels.divDate}>
                <label className={errors.released ? stylesLabels.dangerDate : stylesLabels.labelDate}>
                    <span>Released</span>
                    <input 
                        className={errors.released ? stylesLabels.inputDanger : stylesLabels.inputDate}
                        type='date' 
                        name='released'
                        onChange={handleChange}
                        />
                </label>
                {errors.released && <p className={stylesLabels.dangerText}>{errors.released}</p>}
            </div>
            <div className={styles.divs}>
                <label className={stylesLabels.labelRating}>
                    <span>Rating</span>
                <input
                    className={stylesLabels.inputRating}
                    type='number' 
                    min='0' 
                    max='5' 
                    step='0.1' 
                    name='rating'
                    onChange={handleChange}/>
                    </label>
            </div>
            <input className={styles.btnSubmit} type='submit' value='ADD NEW GAME' />
        </>
    )
}
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteredVideogames, getGenres } from "../../../Actions";
import style from './filter.module.css'

export default function FilterWindow ({active, setActive}){
    const [ filters, setFilters ] = useState(useSelector(state => state.filters))
    let genres = useSelector((state) => state.genresLoaded)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    const addFilter = useCallback((e) => {
        if(e.target.checked) setFilters([...filters, e.target.value])
        else {
            const deleteFilter = filters.filter(el => el !== e.target.value)
            setFilters(deleteFilter)
        }
    }, [filters])

    const isCheck = useCallback((name)=>{
        if (filters.length){
            var check  = filters.includes(name)
        }
        return check
    },[filters]) 
    

    let inputs = useMemo(() => {
        return genres.map((el, index) => {
        return (<label key={index} className={style.checkbox}>
                <input
                    type="checkbox" 
                    name={el.name} 
                    id={el.id} 
                    value={el.name}
                    onClick={addFilter}
                    defaultChecked= {isCheck(el.name)}
                />
                    {el.name}
                </label>)
    })
    }, [genres, addFilter, isCheck])

    function applyFilter(e){
        e.preventDefault()
        dispatch(filteredVideogames(filters))
        setActive(!active)
    }

    function deleteFilters(e) {
        e.preventDefault()
        dispatch(filteredVideogames([]))
        setFilters([])
        setActive(!active)
    }

    return (
        <div >
            { active &&
            <div className={style.container}>
                <div className={style.modal}> 
                    <button onClick={() => setActive(!active)}
                    className={style.btnX}
                    >X</button>
                    <div className={style.name}>FILTRAR POR</div>
                    <hr/>
                    <form>
                        <div className={style.name}>GÉNERO</div>
                        <div className={style.divLabels}>
                            {inputs.map(el => el)}
                        </div>
                        <br/>
                        <div className={style.name}>ORIGEN</div>
                        <div className={style.divOrigin}>
                            <label className={style.checkbox}>
                                <input 
                                type="checkbox" 
                                name="created" 
                                value='created'
                                onClick={addFilter}
                                defaultChecked= {isCheck('created')}
                                />
                                Creado
                            </label>
                            <label className={style.checkbox}>
                                <input 
                                    type="checkbox" 
                                    name="exist" 
                                    id="" 
                                    value='exist'
                                    onClick={addFilter}
                                    defaultChecked= {isCheck('exist')}
                                    />
                                Existente
                            </label>
                        </div>
                        
                        <div className={style.divBtn}>
                            <button 
                            className= {style.btnModal}
                            onClick={applyFilter}>APLICAR FILTROS</button>
                            <button 
                            className= {style.btnModal}
                            onClick={deleteFilters}>LIMPIAR FILTROS</button>
                        </div>
                    </form>
                </div>
            </div>
            }
        </div>
    )
}
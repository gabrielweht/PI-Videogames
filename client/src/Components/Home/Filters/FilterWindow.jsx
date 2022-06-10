import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteredVideogames, getGenres, getVideogames } from "../../../Actions";
import style from './filter.module.css'

export default function FilterWindow ({active, setActive}){
    const [ filters, setFilters ] = useState([])
    let genres = useSelector((state) => state.genresLoaded)
    let dispatch = useDispatch()
    const addFilter = useCallback((e) => {
        if(e.target.checked) setFilters([...filters, e.target.value])
        else {
            const deleteFilter = filters.filter(el => el !== e.target.value)
            setFilters(deleteFilter)
        }
    }, [filters])

    let inputs = useMemo(() => {
        return genres.map((el) => {
            if (filters.length){
                var check  = filters.includes(el.name)
            }
        return <label>
                <input 
                    type="checkbox" 
                    name={el.name} 
                    id={el.id} 
                    value={el.name}
                    onClick={addFilter}
                    checked= {check}
                />
                    {el.name}
            </label>
    })
    }, [genres, addFilter, filters])

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    function applyFilter(e){
        e.preventDefault()
        dispatch(filteredVideogames(filters))
        setActive(!active)
    }

    function deleteFilters() {
        dispatch(getVideogames())
        setFilters([])
        setActive(!active)
    }

    return (
        <div >
            { active &&
            <div className={style.container}>
                <div className={style.card}> 
                    <button onClick={() => setActive(!active)}>X</button>
                    <form>
                        <label>GÉNERO
                            {inputs.map(el => el)}
                        </label>
                        <br/>
                        <span>ORIGEN</span>
                        <br/>
                        <label>
                            <input 
                            type="checkbox" 
                            name="created" 
                            value='created'
                            onClick={addFilter}
                            />
                            Creado
                        </label>
                        <br/>
                        <label>
                            <input 
                                type="checkbox" 
                                name="exist" 
                                id="" 
                                value='exist'
                                onClick={addFilter}
                                />
                            Existente
                        </label>
                        <button onClick={applyFilter}>APLICAR FILTROS</button>
                        <button onClick={deleteFilters}>LIMPIAR FILTROS</button>
                    </form>
                </div>
            </div>
            }
        </div>
    )
}
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
        return (<label key={index}>
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
                <div className={style.card}> 
                    <button onClick={() => setActive(!active)}>X</button>
                    <form>
                        <div>GÉNERO
                            {inputs.map(el => el)}
                        </div>
                        <br/>
                        <span>ORIGEN</span>
                        <br/>
                        <label>
                            <input 
                            type="checkbox" 
                            name="created" 
                            value='created'
                            onClick={addFilter}
                            defaultChecked= {isCheck('created')}
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
                                defaultChecked= {isCheck('exist')}
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
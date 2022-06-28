import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { sort } from "../../../Actions"
import styles from './order.module.css'


export default function Order(){
    let dispatch = useDispatch()
    const [ actualOrder, setActualOrder ] = useState('sinOrden')

    useEffect(() =>{
        dispatch(sort(actualOrder))
    }, [dispatch, actualOrder])

    function orderCards(e){
        setActualOrder(e.target.value)
    }

    return (
        <div className={styles.order}>
            <span className={styles.name}>Order </span>
            <select 
            className={styles.selection}
            name="Ordenar" onChange={orderCards}>
                <option value='sinOrden'  defaultValue='selected'></option>
                <option value="ascendente"  defaultValue='selected'>A-Z</option>
                <option value="descendente"  defaultValue='selected'>Z-A</option>
                <option value="ratingAsc"  defaultValue='selected'>Rating ↓</option>
                <option value="ratingDes" defaultValue='selected'>Rating ↑</option>
            </select>
        </div>
    )
}
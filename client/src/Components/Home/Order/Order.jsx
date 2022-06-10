import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sort } from "../../../Actions"


export default function Order(){
    let order = useSelector((state) => state.order)
    let dispatch = useDispatch()
    const [ actualOrder, setActualOrder ] = useState(order)

    console.log(actualOrder)

    useEffect(() =>{
        dispatch(sort(actualOrder))
    }, [dispatch, actualOrder])

    function orderCards(e){
        setActualOrder(e.target.value)
    }

    function isSelected(value){
        if(order === value) {
            return true
        }
        else return false
    }
    return (
        <div>
            <span>Ordenar: </span>
            <select name="Ordenar" onChange={orderCards}>
                <option value='sinOrden' selected={isSelected('sinOrden')} defaultValue='selected'></option>
                <option value="ascendente" selected={isSelected('ascendente')} defaultValue='selected'>A-Z</option>
                <option value="descendente" selected={isSelected('descendente')} defaultValue='selected'>Z-A</option>
                <option value="ratingAsc" selected={isSelected('ratingAsc')} defaultValue='selected'>Rating Ascendente</option>
                <option value="ratingDes" selected={isSelected('ratingDes')} defaultValue='selected'>Rating Descendente</option>
            </select>
        </div>
    )
}
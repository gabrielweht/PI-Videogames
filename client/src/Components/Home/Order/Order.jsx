import { useDispatch } from "react-redux"
import { sort } from "../../../Actions"


export default function Order(){
    let dispatch = useDispatch()

    function orderCards(e){
        dispatch(sort(e.target.value))
    }

    return (
        <div>
            <span>Ordenar: </span>
            <select name="Ordenar" onChange={orderCards}>
                <option value='sinOrden' selected></option>
                <option value="ascendente">A-Z</option>
                <option value="descendente" >Z-A</option>
                <option value="ratingAsc">Rating Ascendente</option>
                <option value="ratingDes">Rating Descendente</option>
            </select>
        </div>
    )
}
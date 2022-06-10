import { useState } from "react"
import FilterWindow from "./FilterWindow"


export default function Filters() {
    const [ isActive, setIsActive ] = useState(false)

    return (
        <div>
            <button onClick={() => setIsActive(!isActive)}>
                Filtrar por
            </button>
            <FilterWindow active={isActive}
            setActive={setIsActive}
            >

            </FilterWindow>
        </div>
    )
}
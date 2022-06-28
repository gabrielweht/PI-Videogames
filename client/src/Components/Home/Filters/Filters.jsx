import { useState } from "react"
import FilterWindow from "./FilterWindow"
import styles from './filter.module.css'


export default function Filters() {
    const [ isActive, setIsActive ] = useState(false)

    return (
        <div className={styles.filter}>
            <button 
            className={styles.btn}
            onClick={() => setIsActive(!isActive)}>
                Filters
            </button>
            <FilterWindow active={isActive}
            setActive={setIsActive}
            />
        </div>
    )
}
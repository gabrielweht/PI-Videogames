import React from "react";
import Filters from "../Filters/Filters";
import Order from "../Order/Order";
import SearchBar from "../SearchBar/Searchbar";
import styles from './navBar.module.css'

function NavBar() {
    return (
        <div className={styles.navBar}>
            <SearchBar />
            <Order />
            <Filters />
        </div>
    )
}

export default React.memo(NavBar)
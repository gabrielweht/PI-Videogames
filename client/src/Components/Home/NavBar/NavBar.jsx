import React from "react";
import Filters from "../Filters/Filters";
import Order from "../Order/Order";
import SearchBar from "../SearchBar/Searchbar";
import styles from './navBar.module.css'

function NavBar() {
    return (
        <div className={styles.navBar}>
            <img 
            className={styles.logo}
            src="https://camo.githubusercontent.com/35b81f213ddb0e019b3567f6982d740bb2d01ae5dd712a1537e09e826e940228/68747470733a2f2f643331757a386c77666d796e38672e636c6f756466726f6e742e6e65742f4173736574732f6c6f676f2d68656e72792d77686974652d6c672e706e67" alt="Logo" />
            <SearchBar />
            <Order />
            <Filters />
        </div>
    )
}

export default React.memo(NavBar)
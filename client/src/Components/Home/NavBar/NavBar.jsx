import React from "react";
import Filters from "../Filters/Filters";
import Order from "../Order/Order";
import SearchBar from "../SearchBar/Searchbar";

function NavBar() {
    console.log('Nav renderizado')
    return (
        <div>
            <SearchBar />
            <Order />
            <Filters />
        </div>
    )
}

export default React.memo(NavBar)
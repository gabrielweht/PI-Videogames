import { GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAMES_NAME, GET_VIDEOGAME_DETAILS, SORT } from "../Actions/actions-types";

const initialState = {
    genresLoaded: [],
    videogames: [],
    videogamesLoaded: [],
    videogameDetail: {}
}

export default function rootReducer(state = initialState, action) {
    switch (action.type){
        case GET_GENRES: 
            return {
                ...state,
                genresLoaded: action.payload
            }
        case GET_VIDEOGAMES:
            let games = [...action.payload]
            let array = []
            for(var i = 0; i < Math.ceil(games.length/15) ; i++){
                let prevValue = i * 15;
                let postValue = prevValue + 15
                let filteredGames = games.slice(prevValue, postValue)
                array.push(filteredGames)
            }
            return {
                ...state,
                videogamesLoaded: array,
                videogames: action.payload
            }
        case GET_VIDEOGAMES_NAME:
            return {
                ...state,
                videogamesLoaded: action.payload
            }
        // case GET_VIDEOGAME_DETAILS:
        //     return {
        //         ...state,
        //         videogameDetail: action.payload
        //     }
        case SORT:
            let videogamesOrderer = [...state.videogames]
            if(action.payload === 'ascendente'  || action.payload === 'descendente') {
                videogamesOrderer.sort((a, b) =>{
                    let NameA = a.name.toLowerCase()
                    let NameB = b.name.toLowerCase()
                    if (NameA > NameB) {
                        return action.payload === 'ascendente' ? 1 : -1;
                    }
                    if (NameA < NameB) {
                        return action.payload === 'ascendente' ? -1 : 1;
                    }
                    return 0;
                })
            }
            if(action.payload === 'ratingAsc'  || action.payload === 'ratingDes') {
                videogamesOrderer.sort((a, b) =>{
                    if (a.rating > b.rating) {
                        return action.payload === 'ratingAsc' ? 1 : -1;
                    }
                    if (a.rating < b.rating) {
                        return action.payload === 'ratingAsc' ? -1 : 1;
                    }
                    return 0;
                })
            }
            return {
                ...state,
                videogamesLoaded: videogamesOrderer
            }
        default:
            return state
    }
} 
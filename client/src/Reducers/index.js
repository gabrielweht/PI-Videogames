import { GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAMES_NAME, VIDEOGAME_FILTERED, SORT } from "../Actions/actions-types";

const initialState = {
    genresLoaded: [],
    videogames: [],
    videogamesLoaded: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type){
        case GET_GENRES: 
            return {
                ...state,
                genresLoaded: action.payload
            }
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogamesLoaded: action.payload,
                videogames: action.payload
            }
        case GET_VIDEOGAMES_NAME:
            return {
                ...state,
                videogamesLoaded: action.payload.slice(0, 15)
            }
        case VIDEOGAME_FILTERED:
            let games = [...state.videogames]
            let filteredVideogame = []
            action.payload.forEach((el) => {
                games.filter( g => g.genres?.includes(el)).forEach(game => filteredVideogame.push(game))
            })
            return {
                ...state,
                videogamesLoaded: filteredVideogame
            }
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
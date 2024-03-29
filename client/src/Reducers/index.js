import { GET_GENRES, GET_VIDEOGAMES, CLEAN_UP, GET_VIDEOGAMES_NAME, VIDEOGAME_FILTERED, SORT, SET_CURRENT_PAGE } from "../Actions/actions-types";

const initialState = {
    genresLoaded: [],
    videogames: [],
    videogamesLoaded: [],
    current: 0,
    order: 'sinOrden',
    filters: [],
    errors: ''
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
        case SET_CURRENT_PAGE:
            return {
                ...state,
                current: action.payload
            }
        case GET_VIDEOGAMES_NAME:
            return {
                ...state,
                videogamesLoaded: action.payload.slice(0, 15),
                errors: action.error
            }
        case VIDEOGAME_FILTERED:
            let games = [...state.videogames]
            let filteredVideogame = []
            let filters = action.payload
            if(filters.includes('created')){
                filters = filters.filter(el => el !== 'created')
                games.filter(g => typeof g.id !== 'number').forEach(game => filteredVideogame.push(game))
            }
            if(filters.includes('exist')){
                filters = filters.filter(el => el !== 'exist')
                games.filter(g => typeof g.id === 'number').forEach(game => filteredVideogame.push(game))
            }
            if(filters.length){
                filters.forEach((el) => {
                    games.filter( g => g.genres?.includes(el)).forEach(game => {
                        filteredVideogame.push(game)})
                })
            } 
            if(filteredVideogame.length === 0){
                filteredVideogame = state.videogames
            }
            let arrData = new Set(filteredVideogame)
            let result = [...arrData]

            return {
                ...state,
                videogamesLoaded: result,
                filters: action.payload
            }
        case SORT:
            let videogamesOrderer = [...state.videogamesLoaded]
            let orderState
            if(action.payload !== state.order) orderState = action.payload
            else orderState = state.order
            if(orderState === 'ascendente'  || orderState === 'descendente') {
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
            if(orderState === 'ratingAsc'  || orderState === 'ratingDes') {
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
                videogamesLoaded: videogamesOrderer,
                order: action.payload
            }
        case CLEAN_UP:
            return{
                ...state,
                videogamesLoaded: []
            }
        default:
            return state
    }
} 
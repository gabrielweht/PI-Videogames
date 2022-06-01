import { GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAME_DETAILS } from "../Actions/actions-types";

const initialState = {
    genresLoaded: [],
    videogamesLoaded: [],
    videogameDetail: {}
}

export default function rootReducer(state = initialState, action) {
    switch (action.type){
        case GET_GENRES: 
            return {
                ...state,
                genresLoaded: state.genresLoaded.concat(action.payload)
            }
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogamesLoaded: state.videogamesLoaded.concat(action.payload)
            }
        case GET_VIDEOGAME_DETAILS:
            return {
                ...state,
                videogameDetail: action.payload
            }
        
        default:
            return state
    }
} 
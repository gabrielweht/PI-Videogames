import { GET_GENRES, GET_VIDEOGAMES, VIDEOGAME_FILTERED, SORT, ADD_VIDEOGAME, GET_VIDEOGAMES_NAME } from "./actions-types";
const axios = require('axios') 

export function getVideogames() {
    return async (dispatch) => {
        const games = await axios.get(`http://localhost:3001/videogames`)
        dispatch({
            type: GET_VIDEOGAMES,
            payload: games.data.gamesArray
        })
    }
}

export function getVideogamesByName(name) {
    return async (dispatch) => {
        const games = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        dispatch({
            type: GET_VIDEOGAMES_NAME,
            payload: games.data.gamesArray
        })
    }
}

export function getGenres() {
    return async (dispatch) => {
        const genres = await axios.get('http://localhost:3001/genres')
        dispatch({
            type: GET_GENRES,
            payload: genres.data
        })
    }
}

export function filteredVideogames (filters) {
    console.log(filters)
    return {
        type: VIDEOGAME_FILTERED,
        payload: filters
    }
}

export function sort(order) {
    return {
        type: SORT,
        payload: order
    }
}

export function addVideogame (body){
    return async (dispatch) => {
        const createGame = await axios.post('http://localhost:3001/videogame', body)
        dispatch({
            type: ADD_VIDEOGAME,
            payload: createGame.data
        })
    }
}
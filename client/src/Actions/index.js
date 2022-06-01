import { GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAME_DETAILS, ADD_VIDEOGAME } from "./actions-types";
const axios = require('axios')

export function getVideogames(name) {
    let parameter = ''
    if(name) {
        parameter = `?name=${name}`
    }
    return async (dispatch) => {
        const games = await axios.get(`http://localhost:3001/videogames${parameter}`)
        dispatch({
            type: GET_VIDEOGAMES,
            payload: games.data
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

export function getVideogameDetails (id) {
    return async (dispatch) => {
        const game = await axios.get(`http://localhost:3001/videogames/${id}`)
        dispatch({
            type: GET_VIDEOGAME_DETAILS,
            payload: game.data
        })
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
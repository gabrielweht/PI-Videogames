const { API_KEY } = process.env;
const url = 'https://api.rawg.io/api/games'
require('dotenv').config();
const {Videogame, Genre, Op} = require('../db')
const axios = require('axios') 

function searchGames(name) {
    let arrayGames = [];
    let conditions = {}
    if(name) {
        conditions.where = {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
        arrayGames.push(axios.get(`${url}?search=${name}&key=${API_KEY}`))
    } else {
        arrayGames.push(axios.get(`${url}?key=${API_KEY}&page_size=40`))
        for(var i = 3; i < 6; i++){
            arrayGames.push(axios.get(`${url}?key=${API_KEY}&page=${i}`))
        }
    }
    conditions.include = {
        model: Genre,
        as: 'genres'
    }
    arrayGames.push(Videogame.findAll(conditions))
    return arrayGames
}

module.exports = {
    searchGames
}
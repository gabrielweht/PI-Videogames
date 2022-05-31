
const { API_KEY } = process.env;
const url = 'https://api.rawg.io/api/games'
require('dotenv').config();
const {Videogame, Genre, Op} = require('../db')
const axios = require('axios') 

function searchGames(name) {
    let arrayGames = [];
    let conditions = {}
    let search = ''
    if(name) {
        conditions.where = {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
        search = `search=${name}&`
        arrayGames.push(axios.get(`${url}?${search}key=${API_KEY}&page_size=15`))
    } else {
        arrayGames.push(axios.get(`${url}?${search}key=${API_KEY}&page_size=40`))
        for(var i = 3; i < 6; i++){
            arrayGames.push(axios.get(`${url}?${search}key=${API_KEY}&page=${i}`))
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
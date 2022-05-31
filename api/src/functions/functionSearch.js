
const { API_KEY } = process.env;
const url = 'https://api.rawg.io/api/games'
require('dotenv').config();
const {Videogame, Genre, Op} = require('../db')
const axios = require('axios') 

function searchGames(name) {
    let arrayGames = [];
    if(name) {
        for(var i = 1; i < 6; i++){
            arrayGames.push(axios.get(`${url}?search=${name}&key=${API_KEY}&page=${i}`))
        }
        const findByNameDb = Videogame.findAll({
            where:{
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            includes: [{
                model: 'genre',
                as: 'genres',
                attributes: 'name'
            }]
        })
        arrayGames.push(findByNameDb)
    } else {
        for(var i = 1; i < 6; i++){
            arrayGames.push(axios.get(`${url}?key=${API_KEY}&page=${i}`))
        }
        arrayGames.push(Videogame.findAll({
            includes: [{
                model: Genre,
                as: 'genres',
                attributes: 'name'
            }]
        }))
    }  
    return arrayGames
}

module.exports = {
    searchGames
}
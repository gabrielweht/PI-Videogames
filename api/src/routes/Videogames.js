const { Router } = require('express');
const { API_KEY } = process.env;
const url = 'https://api.rawg.io/api/games'
require('dotenv').config();
const {Videogame, Op} = require('../db')
const axios = require('axios') 
const { searchGames } = require('../functions/functionSearch.js')
const router = Router();

router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        const arraySearch = searchGames(name)
        const response = await Promise.all(arraySearch)
        const DBgames = response.pop()
        const APIvideogames = []
        for(var i = 0; i < response.length; i++){
            response[i].data.results.forEach((el) => {
                APIvideogames.push({
                    id: el.id,
                    name: el.name,
                    background_image: el.background_image,
                    genres: el.genres.map(gen => gen.name)
                })
    
                })
        }
        res.json({APIvideogames, DBgames})
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router
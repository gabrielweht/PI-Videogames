const { Router } = require('express');
const { API_KEY } = process.env;
const url = 'https://api.rawg.io/api/games'
require('dotenv').config();
const {Videogame, Op} = require('../db')
const axios = require('axios') 
const { searchGames } = require('../functions/functionSearch.js')
const router = Router();

router.get('/', async (req, res, next) => {
    try {
        let gamesArray = []
        const { name } = req.query;
        const arraySearch = searchGames(name)
        const response = await Promise.allSettled(arraySearch)
        const filteredResponse = response.filter(resp => resp.status === 'fulfilled')
        let gameFromDb = filteredResponse.pop()
        filteredResponse.forEach((el) => {
            el.value.data.results.forEach((result => {
                gamesArray.push({
                    id: result.id,
                    name: result.name,
                    background_image: result.background_image,
                    genres: result.genres.map(gen => gen.name),
                    rating: result.rating,
                    platforms: result.platforms.map(platform => platform.platform.name)
                })
            }))               
        })
        
        gameFromDb.value.forEach(game => {
            gamesArray.push ({
                id: game.id,
                name: game.name,
                background_image: game.background_image,
                genres: game.genres.map(gen => gen.name),
                rating: game.rating,
                platforms: game.platforms
            })
        })
        res.json({gamesArray})
    } catch (error) {
        next(error)
    }
})

module.exports = router
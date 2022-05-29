const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios') 

const router = Router();

router.get('/videogames', async (req, res) => {
    const games = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const gamesCreated = Videogame.findAll()
    const response = await Promise.all([games, gamesCreated])
    const [ videogamesApi, videogamesDB ] = response
})

module.exports = router
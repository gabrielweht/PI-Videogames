const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios') 

const router = Router();


router.post('/videogame', async (req, res) => {
    const { name, description, platforms } = req.body
    const game = await Videogame.create(
        req.body
    )
    res.send(game)
})

module.exports = router
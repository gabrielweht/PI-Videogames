const { Router } = require('express');
require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const { API_KEY } = process.env;
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Op, Videogame, Genre, conn } = require('../db.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());

router.use(morgan('dev'));

router.get('/videogames', async (req, res) => {
    const games = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const gamesCreated = Videogame.findAll()
    const response = await Promise.all([games, gamesCreated])
    const obj = {}
    response[0].data.results.forEach(el => {
        obj[el.name] = {
            name: el.name,
            image: el.background_image,
            genres: el.genres
        }
    })
    res.json(obj)
})










router.post('/videogame', async (req, res) => {
    const { name, description, platforms } = req.body
    const game = await Videogame.create(
        req.body
    )
    res.send(game)
})

module.exports = router;

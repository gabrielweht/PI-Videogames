const { Router } = require('express');
require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const { API_KEY } = process.env;
const fetch = require('node-fetch')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Op, Videogame, Genre, conn } = require('../db.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());

router.use(morgan('dev'));

router.get('/videogames', async (req, res) => {
    const games = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const json = await games.json()
    res.json(json) 
})










// router.post('/videogame', async (req, res) => {
//     const { name, description, platforms } = req.body
//     const game = await Videogame.create(
//         req.body
//     )
//     res.send(game)
// })

module.exports = router;

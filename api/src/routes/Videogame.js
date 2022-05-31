const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios') 
const { Genre, Videogame } = require('../db')

const router = Router();


router.post('/', async (req, res) => {
    const { name, description, platforms, genres, released, rating, background_image } = req.body
    console.log(name)
    console.log(description)
    console.log(platforms)
    if (!name || !description || !platforms) return res.status(400).send('Faltan enviar datos obligatorios')
    const game = await Videogame.create({
        name,
        description, 
        platforms,  
        released, 
        rating, 
        background_image 
    }
    )

    genres.forEach(async (genre) => {
        const searchGenre = await Genre.findOne({
            where:{
                name: genre
            }
        })
        game.addGenre(searchGenre)
    })

    res.send(game)
})

module.exports = router
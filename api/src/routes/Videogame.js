const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios') 
const { Genre, Videogame } = require('../db')

const router = Router();

router.get('/:idVideogame', async (req, res, next) =>{
    const { idVideogame } = req.params
    try {
        if(idVideogame.length < 10){
            if(/^\d+$/.test(idVideogame)){
                const FindApiByID= await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
                const gameResponse = {
                    name: FindApiByID.data.name,
                    description: FindApiByID.data.description,
                    background_image: FindApiByID.data.background_image,
                    released: FindApiByID.data.released,
                    rating: FindApiByID.data.rating,
                    platforms: FindApiByID.data.platforms.map(platform => platform.platform.name),
                    genres: FindApiByID.data.genres.map(genre => genre.name)
                }
                return res.json(gameResponse)
            } 
            throw new Error('El Id ingresado no es válido')
        }
        if(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(idVideogame)){
            const DbByPk = await Videogame.findOne({
                where: {
                    id: idVideogame
                },
                include: {
                    model: Genre,
                    as: 'genres'
                }
            })
            if(DbByPk.length === 0) {
                throw new Error('El Id ingresado no corresponde a un videojuego existente')
            }
            
            const response = {
                name: DbByPk.name,
                description: DbByPk.description,
                background_image: DbByPk.background_image,
                released: DbByPk.released,
                rating: DbByPk.rating,
                platforms: DbByPk.platforms,
                genres: DbByPk.genres.map(genre => genre.name)
            }
            return res.json(response)
        }
        throw new Error('El Id ingresado no es válido')
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name, description, platforms, genres, released, rating, background_image } = req.body
        if (!name || !description || !platforms.length) return res.status(400).send('Faltan enviar datos obligatorios')
        const game = await Videogame.create({
            name,
            description, 
            platforms,  
            released, 
            rating, 
            background_image 
        })

        genres?.forEach(async (genre) => {
            const  [ searchGenre ] = await Genre.findOrCreate({
                where:{
                    name: genre
                }
            })
            game.addGenre(searchGenre)
        })

        res.send('El juego fue creado correctamente')
    } catch (error) {
        next(error)
    }
})

module.exports = router
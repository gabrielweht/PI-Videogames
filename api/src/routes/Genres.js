const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios') 
const { Genre } = require('../db')

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const genres = await Genre.findAll()
        genres.sort((a, b) =>{
            let NameA = a.name.toLowerCase()
            let NameB = b.name.toLowerCase()
            if (NameA > NameB) {
                return 1 
            }
            if (NameA < NameB) {
                return -1
            }
            return 0;
        })
        res.json(genres)
    } catch (error) {
        next(error)
    }
})

module.exports = router
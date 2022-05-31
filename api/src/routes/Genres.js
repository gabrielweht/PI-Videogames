const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios') 
const { Genre } = require('../db')

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const genres = await Genre.findAll()
        res.json(genres)
    } catch (error) {
        next(error)
    }
})

module.exports = router
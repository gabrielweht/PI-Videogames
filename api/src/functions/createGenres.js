const { API_KEY } = process.env;
const url = 'https://api.rawg.io/api/genres'
require('dotenv').config();
const { Genre } = require('../db')
const axios = require('axios') 

async function createGenres() {
    const response = (await axios.get(`${url}?key=${API_KEY}`)).data.results
    response.forEach(async (genre) => {
        const genres = await Genre.create({
            name: genre.name
        })
    });
}

module.exports = {
    createGenres
}
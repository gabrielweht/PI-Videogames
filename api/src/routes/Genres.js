const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios') 

const router = Router();


module.exports = router
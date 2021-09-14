const express = require('express')
const router = express.Router()
const axios = require('axios')
const API_KEY = process.env.API_KEY
const SECRET_SESSION = process.env.SECRET_SESSION
const CLIENT_KEY = process.env.CLIENT_KEY

module.exports = router

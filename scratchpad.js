const express = require('express')
const router = express.Router()
const axios = require('axios')
const API_KEY = process.env.API_KEY
const SECRET_SESSION = process.env.SECRET_SESSION
const CLIENT_KEY = process.env.CLIENT_KEY

//grab all boardgames from Database
router.get('/', isLoggedIn, async (req, res) => {
	try {
		const allGames = await Boardgame.findAll({})
		res.render('boardGame/index', { games: allGames })
	} catch (err) {
		console.log(err)
		res.render('error')
	}
})

module.exports = router

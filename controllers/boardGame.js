const express = require('express')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')
const { fetchDetail, fetchCategory, fetchData } = require('../middleware/data')
const { Boardgame, Favoritelist } = require('../models')

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

// GET /boardGame/1
router.get('/:name', async (req, res) => {
	try {
		const fetchOneGame = await axios.get(gameUrl)
		const data = fetchOneGame.data
		console.log('data', data)

		res.render('boardGame/show', {})

		// res.render('show', { pokedata: pokedata });
	} catch (error) {
		console.log('error', error)
		res.render('error')
	}
})

router.post('/favorite/:gameId', isLoggedIn, async (req, res) => {
	try {
		const { id } = req.user.get()
		const gameId = req.params.gameId

		let fav = await Favoritelist.create({ userId: id, boardgameId: gameId })
		console.log(fav)
		res.render('boardGame/favorite', {})
	} catch (err) {
		console.log(err)
		res.render('error')
	}
})

module.exports = router

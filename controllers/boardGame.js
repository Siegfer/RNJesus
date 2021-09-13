const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const { fetchDetail, fetchCategory, fetchData } = require('../middleware/data')
const { Boardgame, Favoritelist } = require('../models')

//grab all boardgames from Database
router.get('/', isLoggedIn, async (req, res) => {
	try {
		const allGames = await fetchData()
		res.render('boardGame/index', { games: allGames })
	} catch (err) {
		console.log(err)
		res.render('error')
	}
})

//grab all boardgames from Database for Favs
router.get('/favorite', isLoggedIn, async (req, res) => {
	try {
		const gamelist = await Boardgame.findAll({})
		res.render('boardGame/favorite', { games: gamelist })
	} catch (err) {
		console.log(err)
		res.render('error')
	}
})

// GET search  /boardGame/1
router.get('/search', isLoggedIn, async (req, res) => {
	let name = req.query.search
	let games = await fetchDetail(name)
	res.render('boardGame/details', { games: games[0] })
})

// router.get('/details/:idx', isLoggedIn, async (req, res) => {
// 	console.log(req.params.idx)
// 	try {
// 		const game = {}
// 		const thisGame = await Boardgame.findOne({
// 			where: { id: req.params.idx }
// 		})
// 		game.Boardgame = thisGame
// 		res.render('boardGame/details', game)
// 	} catch (err) {
// 		console.log(err)
// 		res.render('error')
// 	}
// })

// POST - receive the name of a board game and add it to the database
router.post('/', async (req, res) => {
	try {
		const [game, wasCreated] = await game.findOrCreate({
			where: { name: req.body.name }
		})
		res.redirect('/boardGame/favorite')
	} catch (error) {
		console.log('error', error)
		res.render('error')
	}
})

// adding association
router.post('/:id', isLoggedIn, async (req, res) => {
	try {
		const { id } = req.user.get()
		const boardGameId = req.params.id

		const addGame = await Favoritelist.create({
			userId: id,
			boardGameId
		})

		res.redirect('/profile')
	} catch (error) {
		console.log(error)
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

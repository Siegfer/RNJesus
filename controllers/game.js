const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const { fetchDetail, randomizeGame } = require('../middleware/data')
const { User, Boardgame, Favoritelist } = require('../models')

// grab all data from database
router.get('/', isLoggedIn, async (req, res) => {
	try {
		const allGames = await Boardgame.findAll({})
		res.render('game/index', { games: allGames })
	} catch (err) {
		console.log(err)
		res.render('error')
	}
})

// Grab data from favorite database link to user
router.get('/favorite', isLoggedIn, async (req, res) => {
	try {
		const { id } = req.user.get()
		const currentUser = await User.findOne({
			where: { id: id },
			include: [Boardgame]
		})
		const parsedUser = currentUser.toJSON()
		const parsedGame = parsedUser.Boardgames.map((game) => {
			return game.toJSON()
		})
		res.render('game/favorite', { games: parsedGame })
	} catch (err) {
		console.log(err)
		res.render('error')
	}
})

// Search the API
router.get('/search', isLoggedIn, async (req, res) => {
	let name = req.query.search
	let games = await fetchDetail(name)
	res.render('game/details', { games: games[0] })
})

// randomize Game from API database
router.get('/random', isLoggedIn, async (req, res) => {
	try {
		const allGames = await randomizeGame()
		res.render('game/show', { games: allGames })
	} catch (err) {
		console.log(err)
		res.render('error')
	}
})

// display more details
router.get('/details/:idx', isLoggedIn, async (req, res) => {
	try {
		const data = {}
		const thisGame = await Boardgame.findOne({
			where: { id: req.params.idx }
		})
		data.game = thisGame
		res.render('game/details', data)
	} catch (error) {
		console.log(error)
		res.render('error')
	}
})

// adding association
router.post('/:id', isLoggedIn, async (req, res) => {
	try {
		const { id } = req.user.get()
		const boardgameId = req.params.id

		const addGame = await Favoritelist.create({
			userId: id,
			boardgameId
		})

		res.redirect('/profile')
	} catch (error) {
		console.log(error)
		res.render('error')
	}
})

// adding data into database
router.post('/', isLoggedIn, async (req, res) => {
	try {
		const { id } = req.user.get()
		const {
			name,
			img_url,
			min_players,
			max_players,
			min_playtime,
			max_playtime,
			min_age,
			description
		} = req.body

		const createdGame = await Boardgame.create({
			name,
			img_url,
			min_players,
			max_players,
			min_playtime,
			max_playtime,
			min_age,
			description
		})

		const addGame = await Favoritelist.create({
			userId: id,
			recipeId: createdGame.id
		})

		res.redirect('/profile')
	} catch (error) {
		console.log(error)
		res.render('error')
	}
})

// remove item in favorite database
router.delete('/:idx', isLoggedIn, async (req, res) => {
	try {
		const { id } = req.user.get()
		const boardgameId = req.params.idx

		const removeItem = await Favoritelist.findOne({
			where: { userId: id, boardgameId }
		})
		await removeItem.destroy()

		res.redirect('/profile')
	} catch (error) {
		console.log(error)
		res.render('error')
	}
})

module.exports = router

const express = require('express')
const router = express.Router()

const { User, Boardgame, Favoritelist } = require('../models')

router.get('/', async (req, res) => {
	try {
		const allGames = await Boardgame.findAll({})
		console.log('ALL Board Games:', allGames)
		const parsedGames = allGames.map((u) => u.toJSON())
		res.render('boardGame/index', { boardgames: parsedGames })
	} catch (err) {
		console.log(err)
	}
})
module.exports = router

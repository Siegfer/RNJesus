const express = require('express')
const router = express.Router()
const axios = require('axios')
const API_KEY = process.env.API_KEY
const SECRET_SESSION = process.env.SECRET_SESSION
const CLIENT_KEY = process.env.CLIENT_KEY

// GET /boardGame/1

const categoryArray = []
const fetchCategory = async () => {
	let dataUrl = `https://api.boardgameatlas.com/api/search?name=Catan&limit=1&pretty=true&client_id=s2XQYtohOX`
	const { data } = await axios.get(dataUrl)
	data.games.map((e) => {
		let dataObject = {
			name: e.name,
			url: e.url,
			image_url: e.image_url,
			min_players: e.min_players,
			max_players: e.max_players,
			min_playtime: e.min_playtime,
			max_playtime: e.max_playtime,
			min_age: e.min_age,
			description: e.description,
			user_rating: e.average_user_rating
		}
		console.log(dataObject)
		categoryArray.push(dataObject)
	})
	return categoryArray
}
fetchCategory()

// router.get('/:name',
let fetchGame = async () => {
	// let name = req.params.name
	let gameUrl = `https://api.boardgameatlas.com/api/search?name=Root&limit=1&pretty=true&client_id=s2XQYtohOX`
	try {
		const fetchOneGame = await axios.get(gameUrl)
		const data = fetchOneGame.data
		console.log('data', data.games.url)

		// let imageSource = data.sprites.front_default
		// console.log(imageSource)
		// let pokeId = data.id
		// let type = data.types[0].type.name

		// res.render('pokemon/show', { src: imageSource, id: pokeId, type: type })
	} catch (error) {
		console.log('error', error)
	}
}

module.exports = router

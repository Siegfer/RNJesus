const axios = require('axios')

const dataArray = []
const fetchData = async () => {
	let dataUrl =
		'https://api.boardgameatlas.com/api/search?limit=100&client_id=s2XQYtohOX'
	const { data } = await axios.get(dataUrl)
	data.games.map((e) => {
		let dataObject = {
			name: e.name,
			image_url: e.image_url,
			min_age: e.min_age,
			min_players: e.min_players,
			max_players: e.max_players,
			min_playtime: e.min_playtime,
			max_playtime: e.max_playtime,
			description_preview: e.description_preview,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		}
		dataArray.push(dataObject)
	})
	return dataArray
}

const categoryArray = []
const fetchCategory = async () => {
	let dataUrl =
		'https://api.boardgameatlas.com/api/game/categories?client_id=s2XQYtohOX'
	const { data } = await axios.get(dataUrl)
	data.categories.map((e) => {
		let dataObject = {
			name: e.name,
			url: e.url
		}
		categoryArray.push(dataObject)
	})
	return categoryArray
}

const detailArray = []
const fetchDetail = async (req, res) => {
	let name = req.query.search
	let dataUrl = `https://api.boardgameatlas.com/api/search?name=${name}&limit=1&pretty=true&client_id=s2XQYtohOX`
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
			num_user_rating: e.number_user_ratings,
			user_rating: e.average_user_rating
		}
		console.log(dataObject)
		detailArray.push(dataObject)
	})
	return categoryArray
}

module.exports = {
	fetchDetail,
	fetchCategory,
	fetchData
}

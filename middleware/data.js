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
			description_preview: e.description_preview
		}
		dataArray.push(dataObject)
	})
	return dataArray
}

const gameArray = []
const randomizeGame = async () => {
	let dataUrl =
		'https://api.boardgameatlas.com/api/search?random=true&client_id=s2XQYtohOX'
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
			description_preview: e.description_preview
		}
		gameArray.push(dataObject)
	})
	return gameArray
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
const fetchDetail = async (name) => {
	try {
		let dataUrl = `https://api.boardgameatlas.com/api/search?name=${name}&limit=1&pretty=true&client_id=s2XQYtohOX`
		const { data } = await axios.get(dataUrl)
		data.games.map((e) => {
			let description = e.description
			if (e.description.includes('<p>')) {
				description = description.replace(/<p>/g, '')
			}
			if (e.description.includes('</p>')) {
				description = description.split('</p>')[0]
			}
			if (e.description.includes('<em>')) {
				description = description.replace(/<em>/g, '')
			}
			if (e.description.includes('</em>')) {
				let array = description.split('</em>')
				description = array.join('')
			}
			if (e.description.includes('<br />')) {
				let array = description.split('<br />')
				description = array.join('')
			}
			if (e.description.includes('&quot')) {
				description = description.replace(/&quot/g, '')
			}
			let dataObject = {
				name: e.name,
				image_url: e.image_url,
				min_players: e.min_players,
				max_players: e.max_players,
				min_playtime: e.min_playtime,
				max_playtime: e.max_playtime,
				min_age: e.min_age,
				description: description,
				user_rating: e.average_user_rating
			}
			detailArray.push(dataObject)
		})
		return detailArray
	} catch (error) {
		console.log('error', error)
	}
}
module.exports = {
	fetchDetail,
	fetchCategory,
	fetchData,
	randomizeGame
}

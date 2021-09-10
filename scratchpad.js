const express = require('express')
const router = express.Router()
const axios = require('axios')
const API_KEY = process.env.API_KEY
const SECRET_SESSION = process.env.SECRET_SESSION
const CLIENT_KEY = process.env.CLIENT_KEY
const API_URL =
	'https://api.boardgameatlas.com/api/search?limit=1&client_id=s2XQYtohOX'

const fetchData = async () => {
	let dataUrl = API_URL
	try {
		const { data } = await axios.get(dataUrl)
		console.log(data)
		data.games.map((e) => {
			let dataObject = {
				name: e.name,
				image_url: e.image_url,
				min_age: e.min_age,
				min_players: e.min_players,
				max_players: e.max_players,
				min_playTime: e.min_playtime,
				max_playTime: e.max_playtime,
				description_preview: e.description_preview
			}
			console.log(dataObject)
		})
		// console.log(data)
	} catch (error) {
		console.log(error)
	}
}
fetchData()

// const { data } = axios.get(API_URL)

// const seedArray = []
// try {
// 	data.games.map((e) => {
// 		const newObj = {
// 			firstName: faker.name.firstName(),
// 			lastName: faker.name.lastName(),
// 			age: 30,
// 			email: faker.internet.email(),
// 			createdAt: new Date().toISOString(),
// 			updatedAt: new Date().toISOString()
// 		}
// 	})
// 	seedArray.push(newObj)
// } catch (error) {
// 	console.log(error)
// }
module.exports = router

// async function fetchData() {
// 	let dataUrl = API_URL
// 	try {
// 		const { data } = await axios.get(dataUrl)
// 		data.games.map((e) => {
// 			name: e.name,
// 			min_age: e.min_age,
// 			min_players: e.min_players,
// 			// console.log(e.min_age)
// 		})
// 		// console.log(data)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }
// fetchData()

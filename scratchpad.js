const express = require('express')
const router = express.Router()
const axios = require('axios')
const API_KEY = process.env.API_KEY
const SECRET_SESSION = process.env.SECRET_SESSION
const CLIENT_KEY = process.env.CLIENT_KEY

async function fetchData() {
	let dataUrl = `https://api.boardgameatlas.com/api/search?limit=30&pretty=true&client_id=s2XQYtohOX`
	try {
		const { data } = await axios.get(dataUrl)
		console.log(data)
	} catch (error) {
		console.log(error)
	}
}
fetchData()

module.exports = router

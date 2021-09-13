const express = require('express')
const router = express.Router()
const axios = require('axios')
const API_KEY = process.env.API_KEY
const SECRET_SESSION = process.env.SECRET_SESSION
const CLIENT_KEY = process.env.CLIENT_KEY

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
	// console.log('</EM>', array)
	console.log('NEW DESCRIPTION AFTER EM', description)
}
if (e.description.includes('<br />')) {
	let array = description.split('<br />')
	description = array.join('')
	console.log('NEW DESCRIPTION AFTER BR', description)
}
if (e.description.includes('&quot')) {
	description = description.replace(/&quot/g, '')
}

module.exports = router

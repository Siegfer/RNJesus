'use strict'
const axios = require('axios')
const API_URL =
	'https://api.boardgameatlas.com/api/search?limit=100&client_id=s2XQYtohOX'

const seedArray = []
const fetchData = async () => {
	let dataUrl = API_URL
	const { data } = await axios.get(dataUrl)
	data.games.map((e) => {
		let dataObject = {
			name: e.name,
			min_age: e.min_age,
			min_players: e.min_players,
			max_players: e.max_players,
			min_playTime: e.min_playtime,
			max_playTime: e.max_playtime,
			description_preview: e.description_preview,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		}
		seedArray.push(dataObject)
	})
	return seedArray
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let fetch = await fetchData()
		await queryInterface.bulkInsert('boardGames', seedArray, {})
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('boardGames', null, {})

		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	}
}

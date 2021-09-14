'use strict'
const axios = require('axios')
const API_URL =
	'https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&client_id=s2XQYtohOX'
const dataArray = []
const fetchData = async () => {
	let dataUrl = API_URL
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

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let fetch = await fetchData()
		await queryInterface.bulkInsert('Boardgames', dataArray, {})
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
		await queryInterface.bulkDelete('Boardgames', null, {})

		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	}
}

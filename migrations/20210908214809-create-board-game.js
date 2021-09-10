'use strict'
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('boardGames', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING(5000)
			},
			min_age: {
				type: Sequelize.INTEGER
			},
			min_players: {
				type: Sequelize.INTEGER
			},
			max_players: {
				type: Sequelize.INTEGER
			},
			min_playTime: {
				type: Sequelize.INTEGER
			},
			max_playTime: {
				type: Sequelize.INTEGER
			},
			description_preview: {
				type: Sequelize.STRING(5000)
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('boardGames')
	}
}

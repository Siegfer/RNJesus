'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class boardGame extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.boardGame.belongsTo(models.User, { foreignKey: 'userId' })
		}
	}
	boardGame.init(
		{
			name: DataTypes.STRING(5000),
			min_age: DataTypes.INTEGER,
			min_players: DataTypes.INTEGER,
			max_players: DataTypes.INTEGER,
			min_playTime: DataTypes.INTEGER,
			max_playTime: DataTypes.INTEGER,
			description_preview: DataTypes.STRING(5000)
		},
		{
			sequelize,
			modelName: 'boardGame'
		}
	)
	return boardGame
}

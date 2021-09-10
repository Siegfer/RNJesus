'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Boardgame extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Boardgame.belongsToMany(models.User, {
				through: 'favoritelist',
				foreignKey: 'userId'
			})
		}
	}
	Boardgame.init(
		{
			name: DataTypes.STRING,
			min_age: DataTypes.INTEGER,
			min_players: DataTypes.INTEGER,
			max_players: DataTypes.INTEGER,
			min_playtime: DataTypes.INTEGER,
			max_playtime: DataTypes.INTEGER,
			description_preview: DataTypes.STRING(5000)
		},
		{
			sequelize,
			modelName: 'Boardgame'
		}
	)
	return Boardgame
}

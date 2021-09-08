'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class boardGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  boardGame.init({
    name: DataTypes.STRING,
    random: DataTypes.BOOLEAN,
    ageRange: DataTypes.INTEGER,
    players: DataTypes.INTEGER,
    playTime: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'boardGame',
  });
  return boardGame;
};
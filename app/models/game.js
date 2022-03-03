const { Model, DataTypes } = require('sequelize');
const sequelize = require('./utils/mysqlConnection')

class Game extends Model {}
Game.init({
  dice1: DataTypes.TINYINT,
  dice2: DataTypes.TINYINT,
  won: DataTypes.BOOLEAN
}, { sequelize, modelName: 'game' });

module.exports = Game
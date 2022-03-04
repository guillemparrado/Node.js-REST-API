const { Model, DataTypes } = require('sequelize');
const sequelize = require('./utils/mysqlConnection')

class Game extends Model {}
Game.init({
  dice1: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  dice2: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  won: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
}, { 
  sequelize, 
  timestamps: false,
  modelName: 'game' });

module.exports = Game
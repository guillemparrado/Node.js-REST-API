const { Model, DataTypes } = require('sequelize');
const sequelize = require('./utils/mysqlConnection')
const Game = require('./game')

class Player extends Model {}
Player.init({
  name: DataTypes.TEXT,
  winsPercent: DataTypes.FLOAT
  // Sequelize afegeix per defecte 'createdAt', no cal incloure'l a la descripció
}, { sequelize, modelName: 'player' });

Player.Game = Player.hasMany(Game)

module.exports = Player
const { Model, DataTypes } = require('sequelize');
const sequelize = require('./utils/mysqlConnection')
const Game = require('./Game')

class Player extends Model {}

Player.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  winsPercent: {
    type: DataTypes.FLOAT,
    defaultValue: null,  // Faig servir null com a 'no inicialitzat'
    allowNull: true
  }
  // Sequelize afegeix per defecte 'createdAt', no cal incloure'l a la descripció
}, { 
  sequelize, 
  // Trec updatedAt, que també ve per defecte i no interessa
  updatedAt: false,
  modelName: 'player' });

module.exports = Player
const db = require('./mysqlConnection')
const Game = require('../Game')
const Player = require('../Player')

Player.Game = Player.hasMany(Game)
Game.Player = Game.belongsTo(Player)

db.sync()

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const { Op } = require('sequelize');

const Player = require('../models/Player');
const Game = require('../models/Game')

/*
RETORNA EL PERCENTATGE MIG D’ÈXITS DEL CONJUNT DE TOTS ELS JUGADORS. Plantejament:
1) Caldria fer la mitjana ponderada dels percentatges dels jugadors, ja que si un jugador té 1000 tirades i winPercent == 50% i un jugador amb una sola tirada té winPercent == 100%, no té gaire sentit retornar 75% sinó 50.01%.
2) En comptes de demanar el count de games associat a cada player, simplifico el mètode fent directament la divisió de won games vs total games.
3) Per eficiència, demano els counts directament a mysql en comptes d'haver de demanar i processar tots els games.
*/
// TODO: reimplementar segons descripció 
router.get('/', jsonParser, (req, res) => {
    
    Game.count({
        where: {won: true}
      }).then(won =>{
          Game.count().then(total => {
                res.send({
                    meanRankingPercent: won/total * 100
                })
          }).catch(e => console.log(e))
      }).catch(e => console.log(e))
})

router.get('/loser', jsonParser, (req, res) => {
    
    Player.min('winsPercent').then(min => {
        Player.findOne({
            where: {
                winsPercent: {
                [Op.eq]: min
              }
            }
        }).then(player => {
            res.send(player)
        })
        .catch(e => console.log(e))
    })
})

router.get('/winner', jsonParser, (req, res) => {
    
    Player.max('winsPercent').then(max => {
        Player.findOne({
            where: {
                winsPercent: {
                [Op.eq]: max
              }
            }
        }).then(player => {
            res.send(player)
        })
        .catch(e => console.log(e))
    })
})


module.exports = router
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const Player = require('../models/Player');
const Game = require('../models/Game')

const { Op } = require('sequelize')


/* 
UN JUGADOR ESPECÍFIC REALITZA UNA TIRADA
Tinc dubtes en aquesta part, sembla que el disseny òptim seria un get i que fos el back en node qui realitzés la tirada. Entenc que tal com està és pq no hi hagi method URIs i que només sigui una API d'iteracció amb una BBDD. Assumeixo que és així: obligo a rebre tirada de daus vàlida i passo la responsabilitat de la tirada al caller de l'api.
*/

router.post('/:id/games', jsonParser, (req, res) => {
    
    // Valida Request
    if(!('dice1' in req.body) || 
    !('dice2' in req.body)){
        res.status(400)
        res.send('Error: Needed fields in the JSON body: dice1, dice2.')
        return
    }

    if(!validDiceResult(req.body.dice1) || !validDiceResult(req.body.dice2)){
        res.status(400)
        res.send('Error: Dice values need to be valid integers between 1 and 6')
        return
    }

    // Valida que player existeix
    Player.findOne({where: {id: req.params.id} })
    .then(result => {
        if(result === null){
            res.status(400)
            res.send(`Error: player with id ${req.params.id} doesn't exist`)
            return
        }
        // Crea i desa tirada
        Game.create({
            playerId: req.params.id,
            dice1: req.body.dice1,
            dice2: req.body.dice2,
            won: req.body.dice1 + req.body.dice2 === 7
        }).then(result => {
            
            actualitzaWinsPercentPlayer(req.params.id)
            
            res.send(result)
        }).catch(e => console.log(e))
    }).catch(e => console.log(e))
})

function actualitzaWinsPercentPlayer(id) {
    Game.count({
        where: {
          playerId: id
        }
    }).then(count => {
        Game.count({
            where: {
                [Op.and]: [
                    {playerId: id},
                    {won: true}
                ]
            }
        }).then(won => {
            winsPercent = (won/count*100).toFixed(2) // 2 decimals
            Player.update({winsPercent}, {
                where: {id}
            }).catch(e => console.log(e))
        }).catch(e => console.log(e))
    }).catch(e => console.log(e))
}

/*
ELIMINA LES TIRADES DEL JUGADOR
Faig el request idempodent: ni faig check ni retorno error quan player no existeixi 
*/
router.delete('/:id/games', jsonParser, (req, res) => {
    Game.destroy({
        where: {playerId: req.params.id}
      }).then(result => {
          console.log(result);
          res.sendStatus(200)
      }).catch(e => console.log(e))
})

/*
RETORNA EL LLISTAT DE JUGADES PER UN JUGADOR
*/
router.get('/:id/games', jsonParser, (req, res) => {
    Game.findAll({
        where: {playerId: req.params.id}
    }).then(result => {
        res.send(result)
    }).catch(e => console.log(e))
})

const validDiceResult = value => Number.isInteger(value) && value >=1 && value <=6

module.exports = router
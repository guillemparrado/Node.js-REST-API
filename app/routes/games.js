const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const Player = require('../models/Player');
const Game = require('../models/Game')

const { Op } = require('sequelize')

const { sendError500 } = require('./utils')

/* 
 UN JUGADOR ESPECÍFIC REALITZA UNA TIRADA
 Tinc dubtes en aquesta part, sembla que el disseny òptim seria un get i que fos el back en node qui realitzés la tirada. Entenc que tal com està és pq no hi hagi method URIs i que només sigui una API d'iteracció amb una BBDD. Assumeixo que és així: obligo a rebre tirada de daus vàlida i passo la responsabilitat de la tirada al caller de l'api.

 UPDATE: és el servidor qui ha de tirar els daus, canvio el codi pq ho faci
 */

const throwDice = () => Math.floor(Math.random() * 6) + 1;

router.post('/:id', jsonParser, async (req, res) => {

    // Llença daus
    const dice1 = throwDice();
    const dice2 = throwDice();

    try {
        // Valida que player existeix
        const player = await Player.findOne({ where: { id: req.params.id } })
        if (player === null) {
            res.status(400)
            res.send({ error: `Player with id ${req.params.id} doesn't exist` })
            return
        }
        console.log(player);

        // Crea i desa tirada
        const game = await Game.create({
            playerId: req.params.id,
            dice1,
            dice2,
            won: dice1 + dice2 === 7
        })
        console.log(game)

        // Actualitza cache usuari
        const count = await Game.count({
            where:{ playerId: req.params.id },
        })
        console.log(count)

        const won = await Game.count({
            where: {
                [Op.and]: [
                    { playerId: req.params.id },
                    { won: true }
                ]
            }
        })
        console.log(won)

        // Resolt bug divisió per zero
        const winsPercent = count === 0 ?
            0 :
            (won / count * 100).toFixed(2) // 2 decimals

        console.log(winsPercent);

        await Player.update({ winsPercent }, {
            where: { id: req.params.id }
        })

        res.send(game)

    } catch (e) {
        sendError500(res, e);
    }
})

/*
 ELIMINA LES TIRADES DEL JUGADOR
 Faig el request idempodent: ni faig check ni retorno error quan player no existeixi
 */
router.delete('/:id', jsonParser, (req, res) => {
    Game.destroy({
        where: { playerId: req.params.id }
    }).then(() => actualitzaWinsPercentPlayer(req.params.id))
        .then(result => {
            res.status(200)
            res.send({ message: `Tirades del jugador ${req.params.id} eliminades correctament.` })
        })
        .catch(error => sendError(res, error))
})

/*
 RETORNA EL LLISTAT DE JUGADES PER UN JUGADOR
 */
router.get('/:id', jsonParser, (req, res) => {
    Game.findAll({
        where: { playerId: req.params.id }
    }).then(games => {
        res.send(games)
    }).catch(error => sendError(res, error))
})

module.exports = router
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const { Op } = require('sequelize');
const {
    Player,
    Game
} = require('../db/db')

/*
 RETORNA EL PERCENTATGE MIG D’ÈXITS DEL CONJUNT DE TOTS ELS JUGADORS. Plantejament:
 1) Caldria fer la mitjana ponderada dels percentatges dels jugadors, ja que si un jugador té 1000 tirades i winPercent == 50% i un jugador amb una sola tirada té winPercent == 100%, no té gaire sentit retornar 75% sinó 50.01%.
 2) En comptes de demanar el count de games associat a cada player, simplifico el mètode fent directament la divisió de won games vs total games.
 3) Per eficiència, demano els counts directament a mysql en comptes d'haver de demanar i processar tots els games.
 */
router.get('/', jsonParser, async (req, res) => {
    try {
        const won = await Game.count({ where: { won: true } });
        const total = await Game.count();
        const globalRanking = won / total * 100;
        res.send({ globalRanking })
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.get('/loser', jsonParser, async (req, res) => {
    try {
        const min = await Player.min('winsPercent');
        const player = await Player.findOne({
            where: {
                winsPercent: {
                    [Op.eq]: min
                }
            }
        });
        res.send(player);

    } catch (error) {
        res.status(500).json({ error });
    }
})

router.get('/winner', jsonParser, async (req, res) => {
    try {
        const max = await Player.max('winsPercent');
        const player = await Player.findOne({
            where: {
                winsPercent: {
                    [Op.eq]: max
                }
            }
        });
        res.send(player);

    } catch (error) {
        res.status(500).json({ error });
    }
})

module.exports = router
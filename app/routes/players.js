const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const { Player } = require('../db/db');

const { sendError } = require('./utils')


/* CREA UN JUGADOR */

router.post('/', jsonParser, (req, res) => {

    // Bad request si falta field name
    if(!('name' in req.body)){
        res.status(400)
        res.send({error: 'Missing JSON body with a \'name\' field in it'})
        return
    }

    // Si nom buit, assigna 'ANÒNIM'
    if(isEmptyString(req.body.name)){
        req.body.name = 'ANÒNIM'
    }

    // Comprova si name ja existeix
    Player.findOne({where: {name: req.body.name} })
    .then(player => {
        //Bad request si name existeix (excepte si és anònim)
        if(req.body.name !== 'ANÒNIM' && player !== null) {
            res.status(400)
            res.send({error: 'Player name already exists!'})
            return
        }

        // Desa player i retorna OK
        Player.create({name: req.body.name})
        .then(player => {
            res.send(player)

        }).catch(error => sendError(res, error))
        
    }).catch(error => sendError(res, error))
    
})


/* MODIFICA EL NOM DEL JUGADOR */
/* Disseny: cal identificar els jugadors per id perquè podem tenir més d'un jugador de nom 'ANÒNIM'*/

router.put('/', jsonParser, (req, res) => {

    // Comprova que el JSON és correcte
    if(!('id' in req.body) || 
    !('newname' in req.body) || 
    !isValidId(req.body.id) ||
    isEmptyString(req.body.newname)){
        res.status(400)
        res.send({error: 'The atributes {id, newname} need to be filled in a JSON body with valid values'})
        return
    }

    // Troba id
    Player.findOne({where: {id: req.body.id} })
    .then(player => {

        //Retorna error si player no existeix
        if(player === null) {
            res.status(404)
            res.send({error: `Player with id: ${req.body.id} doesn't exist`})
            return
        }

        // Canvia nom i retorna
        Player.update(
            {name: req.body.newname},
            {where: {id: req.body.id}}
        ).then(result => {
            res.status(200)
            res.send({
                message: `Player ${req.body.id} name updated correctly to: ${req.body.newname}.`
            })
        }).catch(error => sendError(res, error))
    })
    .catch(error => sendError(res, error))

})

router.get('/', (req, res) => {
    Player.findAll().then(players => {
        res.send(players)
    })
})


const isEmptyString = str => str === undefined || str === null || str.trim() === ''
const isValidId = value => {
    intValue = parseInt(value)
    return typeof intValue == 'number' && intValue !== 0
}

module.exports = router;
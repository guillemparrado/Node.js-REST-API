const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const Player = require('../models/Player');


/* CREA UN JUGADOR */

router.post('/', jsonParser, (req, res) => {

    // Bad request si falta field name
    if(!('name' in req.body)){
        res.status(400)
        res.send('Missing JSON body with a \'name\' field in it')
        return
    }

    // Si nom buit, assigna 'ANÒNIM'
    if(isEmptyString(req.body.name)){
        req.body.name = 'ANÒNIM'
    }

    // Comprova si name ja existeix
    Player.findOne({where: {name: req.body.name} })
    .then(result => {
        //Bad request si name existeix (excepte si és anònim)
        if(req.body.name != 'ANÒNIM' && result !== null) {
            res.status(400)
            res.send('Player name already exists!')
            return
        }

        // Desa player i retorna OK
        Player.create({name: req.body.name})
        .then(result => {
            res.status(200)
            res.send(result)
        })
        .catch(e => console.log(e))
        
    })
    .catch(e => {
        console.log(e);
    })
    
})


/* MODIFICA EL NOM DEL JUGADOR */
/* Discussió: cal identificar els jugadors per id perquè, si ho fem per nom i és anònim, no sabrem a quin de tots els que
hi pugui haver a la base de dades s'està referint */

router.put('/', jsonParser, (req, res) => {

    // Comprova que el JSON és correcte
    if(!('id' in req.body) || 
    !('newname' in req.body) || 
    !isValidId(req.body.id) ||
    isEmptyString(req.body.newname)){
        res.status(400)
        res.send('The atributes {id, newname} need to be filled in a JSON body with valid values')
        return
    }

    // Troba id
    Player.findOne({where: {id: req.body.id} })
    .then(result => {

        //Retorna error si user no existeix
        if(result === null) {
            res.status(404)
            res.send(`User with id: ${req.body.id} doesn't exist`)
            return
        }

        // Canvia nom i retorna
        Player.update(
            {name: req.body.newname},
            {where: {id: req.body.id}}
        ).then(result => {
            res.sendStatus(200)
        }).catch(e => { 
            console.log(e)
        })
    })
    .catch(e => {
        console.log(e);
    })

})

router.get('/', (req, res) => {
    Player.findAll().then(results => {
        res.send(results)
    })
})


const isEmptyString = str => str === undefined || str === null || str.trim() === ''
const isValidId = value => {
    intValue = parseInt(value)
    return typeof intValue == 'number' && intValue != 0
}

module.exports = router;
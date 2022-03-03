const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const Player = require('../models/player');


/* CREA UN JUGADOR */

router.post('/', jsonParser, async (req, res) => {

    // Bad request si falta field username
    if(!('username' in req.body)){
        res.status(400)
        res.send('Missing JSON body with a \'username\' field in it')
        return
    }

    // Si nom buit, assigna 'ANÒNIM'
    if(isEmptyString(req.body.username)){
        req.body.username = 'ANÒNIM'
    }

    // Comprova si username ja existeix
    Player.findOne({where: {name: req.body.username} })
    .then(result => {
        //Bad request si username existeix (excepte si és anònim)
        if(req.body.username != 'ANÒNIM' && result !== null) {
            res.status(400)
            res.send('Username already exists')
            return
        }

        // Desa player i retorna OK
        Player.create({name: req.body.username})
        .then(result => {
            res.sendStatus(200)
        })
        .catch(e => console.log(e))
        
    })
    .catch(e => {
        console.log(e);
    })
    
})


/* MODIFICA EL NOM DEL JUGADOR */
router.put('/', jsonParser, async (req, res) => {

    // Comprova que el JSON és correcte
    if(!('username' in req.body) || 
    !('newname' in req.body) || 
    isEmptyString(req.body.username) ||
    isEmptyString(req.body.newname) ||
    req.body.username === 'ANÒNIM'){
        res.status(400)
        res.send('The atributes {username, newname} need to be filled in a JSON body + username cannot be \'ANÒNIM\'')
        return
    }

    // Troba username
    Player.findOne({where: {name: req.body.username} })
    .then(result => {

        //Retorna error si username no existeix
        if(result === null) {
            res.status(404)
            res.send('Username doesn\'t exist')
            return
        }

        // Canvia nom i retorna
        Player.update(
            {name: req.body.newname},
            {where: {name: req.body.username}}
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


const isEmptyString = str => str === undefined || str === null || str.trim() === ''

 module.exports = router;
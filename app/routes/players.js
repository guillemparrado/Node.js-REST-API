const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const Player = require('../models/player');


router.post('/', jsonParser, async (req, res) => {

    // Bad request si falta field username
    if(!('username' in req.body)){
        res.status(400)
        res.send('Missing JSON body with a \'username\' field in it')
        return
    }

    // Si nom buit, assigna 'ANÒNIM'
    if(req.body.username === undefined || 
        req.body.username === null || 
        req.body.username.trim() === '' ){
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



 module.exports = router;
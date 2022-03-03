const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const fs = require('fs');

 // Nivell 1 Exercici 2
router.post('/', jsonParser, (req, res) => {
    console.log(req.body);
    res.send()
})


 module.exports = router;
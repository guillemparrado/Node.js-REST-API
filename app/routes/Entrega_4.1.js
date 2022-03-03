
const UPLOAD_PATH = 'server_uploads/'

const express = require('express');
const router = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const upload = multer({ dest: UPLOAD_PATH})
const cors = require('cors')()
const fs = require('fs');
const db = require('../utils/jsonDB');
db.connect(UPLOAD_PATH + 'files_description.json')


// Nivell 1 Exercici 1
router.get('/user', (req, res) => {
    res.send({
        nom: 'Guillem Parrado',
        edat: 34,
        url: req.protocol + '://' + req.get('host') + req.originalUrl
    });
 })


 // Nivell 1 Exercici 2
router.post('/upload', upload.single('image'), (req, res) => {

    // Retorna codi: 'No Content' si no s'ha rebut file
    if(req.file === undefined){
        res.sendStatus(204)
        return
    }

    // Desa file i descripció de file i retorna codi: 'OK' si s'ha rebut file amb extensió correcta

    const nameSplit = req.file.originalname.split('.');
    const ext = nameSplit[nameSplit.length - 1]
    console.log(ext);

    if(nameSplit.length >= 2 && (ext == 'jpg' || ext == 'png' || ext == 'gif')){
        db.addFileData(req.file)
        res.sendStatus(200)
        return
    }
    
    // En cas contrari, elimina file rebut i retorna codi: 'Unsuported Media Type'
    fs.unlink(req.file.path, err => {if(err) console.log(err)})
    res.sendStatus(415)
})


// Nivell 2 Exercici 1, Nivell 3 Exercici 1

// Middleware específic

function addNoCacheHeader(req, res, next){
    res.set('Cache-control', 'no-cache')
    next()
}

// Li poso tot el middleware a la ruta en comptes de posar-ne a tota l'app (sempre es pot moure algun a app.use més endavant si totes les rutes el necessiten)

router.post('/time', [jsonParser, addNoCacheHeader, cors], (req, res) => {

    // Comprova autenticació
    if(req.headers.authorization === undefined ||
        req.headers.authorization.substring(0, 5) != 'Basic'){
            console.log('Unauthorized attempt');
            res.sendStatus(401)
            return
        }

    // En cas que n'hi hagi fes log
    user_passwd = Buffer.from(req.headers.authorization.substring(6), 'base64').toString()
    console.log(`BasicAuth From Header: ${user_passwd}`);
    
    // Log del nom d'usuari rebut
    let msg = 'Username From JSON body: '
    msg += req.body.username ? req.body.username : 'undefined'
    console.log(msg);

    // Envia datetime actual
    res.send({
        currentDateTime: Date()
    })
})


 module.exports = router;
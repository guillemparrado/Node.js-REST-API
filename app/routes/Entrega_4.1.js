
const UPLOAD_PATH = 'server_uploads/'

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: UPLOAD_PATH})
const fs = require('fs');
const db = require('../utils/jsonDB');
db.connect(UPLOAD_PATH + 'files_description.json')


// Exercici 1.1
router.get('/user', (req, res) => {
    res.send({
        nom: 'Guillem Parrado',
        edat: 34,
        url: req.protocol + '://' + req.get('host') + req.originalUrl
    });
 })


 // Exercici 1.2
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


 module.exports = router;
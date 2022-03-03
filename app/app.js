const express = require('express');
const app = express();

app.get('/user', function (req, res) {
   res.send({
       nom: 'Guillem Parrado',
       edat: 34,
       url: req.protocol + '://' + req.get('host') + req.originalUrl
   });
})

const server = app.listen(80, () => {
   let host = server.address().address
   let port = server.address().port

   host = host != '::' ? host : 'localhost'
   
   console.log(`Express server listening on: http://${host}:${port}`)
})
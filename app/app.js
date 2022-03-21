const express = require('express');
entrega_41 = require('./routes/Entrega_4.1')

const app = express();
app.use('/', entrega_41)

const server = app.listen(80, () => {
   let host = server.address().address
   let port = server.address().port

   host = host != '::' ? host : 'localhost'
   
   console.log(`Express server listening on: http://${host}:${port}`)
})
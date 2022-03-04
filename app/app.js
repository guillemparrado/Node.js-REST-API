const express = require('express');
playersRoutes = require('./routes/players')
gamesRoutes = require('./routes/games')
rankingsRoutes = require('./routes/rankings')
require('./models/utils/wireSequelize')


const app = express();
app.use('/players', playersRoutes)
//app.use('/players/:id/games', gamesRoutes)
//app.use('/players', rankingsRoutes)

const server = app.listen(80, () => {
   let host = server.address().address
   let port = server.address().port

   host = host != '::' ? host : 'localhost'
   
   console.log(`Express server listening on: http://${host}:${port}`)
})


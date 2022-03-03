const express = require('express');
const db = require('./mysqlConnection')
playersRoutes = require('./routes/players')
gamesRoutes = require('./routes/games')
rankingsRoutes = require('./routes/rankings')


const app = express();
app.use('/players', playersRoutes)
//app.use('/players', gamesRoutes)
//app.use('/players', rankingsRoutes)


db.authenticate().then(() => {
   console.log("Connected to the database!")

   const server = app.listen(80, () => {
      let host = server.address().address
      let port = server.address().port

      host = host != '::' ? host : 'localhost'
      
      console.log(`Express server listening on: http://${host}:${port}`)
   })
});

const express = require('express');
playersRoutes = require('./routes/players')
gamesRoutes = require('./routes/games')
rankingRoutes = require('./routes/ranking')
defaultRoutes = require('./routes/default')
require('./models/utils/wireSequelize')

const app = express();

require('./models/utils/createDatabaseIfItDoesntExist').then(() => {

    app.use('/players', playersRoutes)
    app.use('/games', gamesRoutes)
    app.use('/players/ranking', rankingRoutes)
    app.use('/', defaultRoutes)

    const server = app.listen(80, () => {
        let host = server.address().address
        let port = server.address().port

        host = host !== '::' ? host : 'localhost'

        console.log(`Express server listening on: http://${host}:${port}`)
    })
})


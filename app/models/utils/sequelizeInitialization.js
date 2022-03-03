const db = require('./mysqlConnection')
require('../game')
require('../player')

db.sync()
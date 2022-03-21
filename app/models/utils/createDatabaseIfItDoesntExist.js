require("dotenv").config();
const mysql = require("mysql2");

module.exports = new Promise((resolve, reject) => {
        // Connect
        const connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
        });
    
        // Create
        connection.query(
            `CREATE DATABASE IF NOT EXISTS DiceGame CHARACTER SET utf8mb4;`,
            (err, results) => {

                if(err) 
                    throw err
                
                // Close the connection
                connection.end();
                resolve()
            }
        )
})




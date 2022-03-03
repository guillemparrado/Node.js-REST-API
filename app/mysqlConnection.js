require("dotenv").config();
const { Sequelize } = require("sequelize");

const db = new Sequelize("dicegame",  process.env.MYSQL_USER,  process.env.MYSQL_PASSWORD,  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
});

module.exports = db;

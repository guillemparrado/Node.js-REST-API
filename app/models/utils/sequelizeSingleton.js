require("dotenv").config();
const sequelize = require("sequelize");

const db = new sequelize("dicegame",  process.env.MYSQL_USER,  process.env.MYSQL_PASSWORD,  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
});

module.exports = db;

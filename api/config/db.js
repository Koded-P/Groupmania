//Link DB PostGres 
const { Sequelize } = require('sequelize') 
const sequelize = new Sequelize("groupmania", "postgres", 1234, {
    host: "localhost",
    dialect: "postgres",
  });
  

  module.exports = sequelize
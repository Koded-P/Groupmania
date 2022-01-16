//Link DB PostGres 
const { Sequelize } = require('sequelize') 
const sequelize = new Sequelize("groupmania", "postgres", 'gamblers1', {
    host: "localhost",
    dialect: "postgres",
  });
  

  module.exports = sequelize
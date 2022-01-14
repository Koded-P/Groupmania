const db = require('../config/db')
const  {DataTypes} = require('sequelize') 

const User = db.define('User', {
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
      }
  }, {
    // Other model options go here
  });
  
  User.sync()
module.exports =  User
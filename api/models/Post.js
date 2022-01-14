const db = require('../config/db')
const  {DataTypes} = require('sequelize') 

const Post = db.define('Post', {
    // Model attributes are defined here
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
      // allowNull defaults to true
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
      },
      parentId:{
        type: DataTypes.INTEGER,
        allowNull: true
      },
      rootId:{
        type: DataTypes.INTEGER,
        allowNull: true
      }
      
  }, {
    // Other model options go here
  });
  
  Post.sync()
  module.exports =  Post
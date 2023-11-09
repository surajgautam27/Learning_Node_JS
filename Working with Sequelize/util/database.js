const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete','root','suraj',{
     dialect:'mysql',
     host:'localhost'
    })
    module.exports= sequelize
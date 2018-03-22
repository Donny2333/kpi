/**
 * Created by Donny on 17/3/15.
 */
var Sequelize = require('sequelize')
var config = require('../config')

var sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    define: config.db.define
  })

module.exports = sequelize

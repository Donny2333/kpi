/**
 * Created by Donny on 17/3/15.
 */
var Sequelize = require('sequelize')
var sequelize = require('../config/lib/sequelize')

var Users = sequelize.define('t_s_users', {
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NAME: {
    type: Sequelize.STRING(20),
    unique: true
  },
  NICK_NAME: Sequelize.STRING(50),
  PASSWORD: Sequelize.STRING,
  CREATE_DATE: Sequelize.DATE,
  CREATE_BY: Sequelize.STRING(20),
  CREATE_NAME: Sequelize.STRING(50),
  UPDATE_DATE: Sequelize.DATE,
  UPDATE_BY: Sequelize.STRING(20),
  UPDATE_NAME: Sequelize.STRING(50)
})

module.exports = Users

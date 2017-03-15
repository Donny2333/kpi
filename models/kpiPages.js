/**
 * Created by Donny on 17/3/15.
 */
var Sequelize = require('sequelize');
var sequelize = require('../config/evn');
var Users = require('../models/users');

var KpiPages = sequelize.define('t_kpi_pages', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TITLE: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    CONTENT: Sequelize.STRING(500),
    IS_SHOW: Sequelize.STRING(1),
    SHOW_INDEX: Sequelize.INTEGER,
    CREATE_DATE: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    CREATE_BY: {
        type: Sequelize.STRING(20),
        references: {
            model: Users,
            key: 'NAME'
        }
    },
    CREATE_NAME: Sequelize.STRING(50),
    UPDATE_DATE: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    UPDATE_BY: {
        type: Sequelize.STRING(20),
        references: {
            model: Users,
            key: 'NAME'
        }
    },
    UPDATE_NAME: Sequelize.STRING(50)
});

module.exports = KpiPages;
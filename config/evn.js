/**
 * Created by Donny on 17/3/15.
 */
var Sequelize = require('sequelize');

var sequelize = new Sequelize('test_kpi', 'root', 'admin', {
    host: '192.168.99.253',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;
/**
 * Created by Donny on 17/2/28.
 */
var mysql = require('mysql');

module.exports = function () {
    var client = {};
    var connectString = {
        host: '192.168.99.253',
        port: '3306',
        user: 'root',
        password: 'admin',
        database: 'kpi'
    };

    return {
        connect: function () {
            client = mysql.createConnection(connectString);
            return client.connect();
        },

        query: function (select_expr, table_references, next) {
            var queryString = "select " + select_expr + " from " + table_references;
            return client.query(queryString, next);
        },

        insert: function (tbl_name, partition_name, expr, next) {
            var queryString = "insert `" + tbl_name + "` " + partition_name + ' values ' + expr;
            return client.query(queryString, next);
        },

        delete: function (tbl_name, where_condition, next) {
            var queryString = "delete from `" + tbl_name + "` where " + where_condition;
            console.log(queryString);
            return client.query(queryString, next);
        },

        disconnect: function () {
            return client.end();
        }
    };
};
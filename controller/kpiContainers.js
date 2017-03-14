/**
 * Created by Donny on 17/3/14.
 */
var database = require('./../service/database');
var util = require('util');

var db = database();

db.connect();

module.exports = function () {
    var kpiContainers = {};

    const TABLE_NAME = 't_kpi_containers';

    kpiContainers.list = function (req, res) {

    };

    kpiContainers.insert = function (req, res) {
        var container = req.body.container;

        var partition_name = "( ID, TITLE,  IS_SHOW, SHOW_INDEX, HEIGHT, WIDTH, PAGE_ID, CREATE_DATE, " +
            "CREATE_BY, CREATE_NAME, UPDATE_DATE, UPDATE_BY, UPDATE_NAME)";

        var expr = util.format("( '%s',  '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
            container.id, container.title, container.show, container.index, container.height, container.width, container.pageID,
            container.createDate, container.createBy, container.createName, container.updateDate, container.updateBy, container.updateName);

        db.insert(TABLE_NAME, partition_name, expr, function (err, results, fields) {
            if (err) {
                throw err;
            }

            if (results) {
                var _result = [];
                for (var i = 0; i < results.length; i++) {
                    if (_result[i].IS_SHOW) {
                        _result.push({
                            index: results[i].SHOW_INDEX,
                            title: results[i].TITLE
                        });
                    }
                }
            }

            return res.json(_result);
        });

    };

    kpiContainers.delete = function (req, res) {

    };


    return kpiContainers;
};
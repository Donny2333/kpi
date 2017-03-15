/**
 * Created by Donny on 17/3/14.
 */
var database = require('./../service/database');
var log = require('./log');
var util = require('util');

var db = database();

db.connect();

module.exports = function () {

    var kpi1tems = {};

    const TABLE_NAME = 't_kpi_items';

    kpi1tems.list = function (req, res) {

    };

    kpi1tems.insert = function (req, res) {
        var item = req.body.item;

        var partition_name = "( ID, NAME, DATA_SOURCE, IS_SHOW, SHOW_INDEX, HEIGHT, WIDTH, CONTAINER_ID, CREATE_DATE, " +
            "CREATE_BY, CREATE_NAME, UPDATE_DATE, UPDATE_BY, UPDATE_NAME)";

        var expr = util.format("( '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
            item.id, item.name, item.dataSource, item.show, item.index, item.height, item.width, item.containerID,
            item.createDate, item.createBy, item.createName, item.updateDate, item.updateBy, item.updateName);

        db.insert(TABLE_NAME, partition_name, expr, function (err, results, fields) {
            if (err) {
                log.error(req, res, err);
            }

            if (results) {
                var _result = [];
                for (var i = 0; i < results.length; i++) {
                    if (_result[i].IS_SHOW) {
                        _result.push({
                            index: results[i].SHOW_INDEX,
                            title: results[i].NAME
                        });
                    }
                }
            }

            res.json(_result);
        });

    };

    kpi1tems.delete = function (req, res) {

    };

    kpi1tems.findByContainerID = function (CtID) {

        var _result = [];

        db.query('*', TABLE_NAME, "CONTAINER_ID in ('" + CtID + "')", function (err, results, fields) {
            if (results) {
                for (var i = 0; i < results.length; i++) {
                    if (_result[i].IS_SHOW) {
                        _result.push({
                            id: results[i].ID,
                            index: results[i].SHOW_INDEX,
                            name: results[i].NAME,
                            height: results[i].HEIGHT,
                            width: results[i].WIDTH,
                            dataSource: results[i].DATA_SOURCE,
                        });
                    }
                }
            }
        });

        return _result;
    };

    return kpi1tems;
};
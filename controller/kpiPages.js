/**
 * Created by Donny on 17/2/28.
 */
var database = require('./../service/database');
var log = require('./log');
var util = require('util');

var db = database();

db.connect();

module.exports = function () {

    var kpiPages = {};

    const TABLE_NAME = 't_kpi_pages';

    kpiPages.list = function (req, res) {

        db.query('*', TABLE_NAME, function (err, results, fields) {
            if (err) {
                log.error(req, res, err);
            }

            if (results) {
                var _result = [];
                for (var i = 0; i < results.length; i++) {
                    _result.push({
                        index: results[i].SHOW_INDEX,
                        title: results[i].TITLE
                    });
                }

                res.json(_result);
            }
        });
    };

    kpiPages.insert = function (req, res) {
        var page = req.body.page;

        var partition_name = "( ID, TITLE,  IS_SHOW, SHOW_INDEX, CREATE_DATE, " +
            "CREATE_BY, CREATE_NAME, UPDATE_DATE, UPDATE_BY, UPDATE_NAME)";

        var expr = util.format("( '%s',  '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
            page.id, page.title, page.show, page.index, page.createDate, page.createBy,
            page.createName, page.updateDate, page.updateBy, page.updateName);

        db.insert(TABLE_NAME, partition_name, expr, function (err, results, fields) {
            if (err) {
                log.error(req, res, err);
            }

            if (results) {
                var _result = [];
                for (var i = 0; i < results.length; i++) {
                    _result.push({
                        index: results[i].SHOW_INDEX,
                        title: results[i].TITLE
                    });
                }
            }

            res.json(_result);
        });
    };

    kpiPages.delete = function (req, res) {
        var id = req.params.id;

        var where_condition = util.format("id in ('%s')", id);

        db.delete(TABLE_NAME, where_condition, function (err, results, fields) {
            if (err) {
                log.error(req, res, err);
            }

            if (results) {
                var _result = [];
                for (var i = 0; i < results.length; i++) {
                    _result.push({
                        index: results[i].SHOW_INDEX,
                        title: results[i].TITLE
                    });
                }
            }

            res.json(_result);
        })
    };

    return kpiPages;
};
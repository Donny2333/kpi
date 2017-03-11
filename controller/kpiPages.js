/**
 * Created by Donny on 17/2/28.
 */
var database = require('./../service/database');
var util = require('util');

var db = database();

module.exports = function () {
    var kpiPages = {};
    const TABLE_NAME = 't_kpi_pages';

    kpiPages.query = function (next) {
        db.connect();
        db.query('*', TABLE_NAME, function (err, results, fields) {
            if (err) {
                throw err;
            }

            if (results) {
                var res = [];
                for (var i = 0; i < results.length; i++) {
                    res.push({
                        index: results[i].SHOW_INDEX,
                        title: results[i].TITLE,
                        // content: results[i].CONTENT
                    });
                }

                return next(res);
            }
        });
    };

    kpiPages.insert = function (page, next) {
        var partition_name = "( `ID`, `TITLE`, `CONTENT`, `EDIT_CONTENT`, `IS_SHOW`, `SHOW_INDEX`, " +
            "`CREATE_DATE`, `CREATE_BY`, `CREATE_NAME`, `UPDATE_DATE`, `UPDATE_BY`, `UPDATE_NAME`)";

        var expr = util.format("( '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
            page.id, page.title, page.content, page.edit, page.show, page.index, page.createDate,
            page.createBy, page.createName, page.updateDate, page.updateBy, page.updateName);

        db.connect();
        db.insert(TABLE_NAME, partition_name, expr,
            function (err, results, fields) {
                if (err) {
                    throw err;
                }

                if (results) {
                    var res = [];
                    for (var i = 0; i < results.length; i++) {
                        res.push({
                            index: results[i].SHOW_INDEX,
                            title: results[i].TITLE,
                            // content: results[i].CONTENT
                        });
                    }
                }

                return next(res);
            });
    };

    kpiPages.delete = function (id, next) {
        var where_condition = util.format("`id` in ('%s')", id);

        db.connect();
        db.delete(TABLE_NAME, where_condition, function (err, results, fields) {
            if (err) {
                throw err;
            }

            if (results) {
                var res = [];
                for (var i = 0; i < results.length; i++) {
                    res.push({
                        index: results[i].SHOW_INDEX,
                        title: results[i].TITLE,
                        // content: results[i].CONTENT
                    });
                }
            }

            return next(res);
        })
    };

    return kpiPages;
};
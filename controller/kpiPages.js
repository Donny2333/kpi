/**
 * Created by Donny on 17/2/28.
 */
var KpiPages = require('../models/kpiPages');
var log = require('./log');

module.exports = function () {

    var kpiPages = {};

    kpiPages.list = function (req, res) {
        KpiPages.findAll().then(function (pages) {
            res.json(pages);
        })
    };

    kpiPages.insertOrUpdate = function (req, res) {
        var page = req.body.page;
        KpiPages.findOne({
            where: {
                ID: page.ID
            }
        }).then(function (kpi) {
            if (kpi) { // update
                kpi.update(page).then(function (message) {
                    res.json(message);
                }, function (err) {
                    res.json(err)
                });
            }
            else { // insert
                KpiPages.create(page).then(function (message) {
                    res.json(message);
                }, function (err) {
                    res.json(err)
                });
            }
        })
    };

    kpiPages.delete = function (req, res) {
        var id = req.params.id;
        KpiPages.destroy({
            where: {
                ID: id
            }
        }).then(function (message) {
            res.json(message);
        }, function (err) {
            res.json(err)
        });
    };

    // 读取数据库传给前端json页面
    kpiPages.getOne = function (req, res) {
        var id = req.params.id;

        KpiPages.findOne({
            where: {
                ID: id
            }
        }).then(function (page) {
            res.json(page);
        })
    };

    return kpiPages;
};
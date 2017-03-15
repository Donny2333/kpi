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
                ID: page.id
            }
        }).then(function (obj) {
            if (obj) { // update
                return obj.update(page);
            }
            else { // insert
                return KpiPages.create(page);
            }
        })
    };

    kpiPages.delete = function (req, res) {
        var id = req.body.id;
        KpiPages.destroy({
            where: {
                ID: id
            }
        });
    };

    // 读取数据库传给前端json页面
    kpiPages.get = function (req, res) {

    };

    // 接受前端传来的json页面存储到数据库
    kpiPages.set = function (req, res) {

    };

    return kpiPages;
};
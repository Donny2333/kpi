/**
 * Created by Donny on 17/2/28.
 */
var KpiPages = require('../models/kpiPages')
var log = require('../config/lib/log')

module.exports = function () {

  var kpiPages = {}

  // 列出所有页面
  kpiPages.list = function (req, res) {
    KpiPages.findAll().then(function (pages) {
      res.json(pages)
    })
  }

  // 根据指定ID创建或更新页面
  kpiPages.insertOrUpdate = function (req, res) {
    var page = req.body.page

    KpiPages.findOne({
      where: {
        ID: page.ID
      }
    }).then(function (kpi) {
      if (kpi) { // update
        kpi.update(page).then(function (message) {
          res.json(message)
        }, function (err) {
          res.json(err)
        })
      }
      else { // insert
        KpiPages.create(page).then(function (message) {
          res.json(message)
        }, function (err) {
          res.json(err)
        })
      }
    })
  }

  // 删除指定ID的页面
  kpiPages.delete = function (req, res) {
    var ids = req.body.ids
    KpiPages.destroy({
      where: {
        ID: {
          $in: ids
        }
      }
    }).then(function (message) {
      res.json(message)
    }, function (err) {
      res.json(err)
    })
  }

  // 读取指定ID的页面
  kpiPages.getOne = function (req, res) {
    var id = req.params.id

    KpiPages.findOne({
      where: {
        ID: id
      }
    }).then(function (page) {
      res.json(page)
    })
  }

  return kpiPages
}

/**
 * Created by Donny on 17/2/28.
 */
var express = require('express');
var bodyParser = require("body-parser");
var kpiPages = require('./controller/kpiPages');

var app = express();
var kpi = kpiPages();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.send('hello world');
});

app.get('/kpiPages', function (req, res) {
    kpi.query(function (pages) {
        res.send(pages);
    });
}).post('/kpiPages', function (req, res) {
    var date = new Date();
    var dateTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    var page = {
        id: '2',
        title: '新建模版',
        content: '<span>这里是测试模版内容</span>',
        edit: '<span>这里是测试模版内容</span>',
        show: 'Y',
        index: '1',
        createDate: dateTime,
        createBy: 'admin',
        createName: '管理员',
        updateDate: dateTime,
        updateBy: 'admin',
        updateName: '管理员'
    };

    kpi.insert(page, function (pages) {
        res.send(pages);
    });
}).delete('/kpiPages/:id', function (req, res) {
    kpi.delete(req.params.id, function (pages) {
        res.send(pages);
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
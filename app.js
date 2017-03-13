/**
 * Created by Donny on 17/2/28.
 */
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require("body-parser");
var kpiPages = require('./controller/kpiPages');

var app = express();
var kpi = kpiPages();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    // res.render('index', {title: 'index', name: 'Donny'});
    res.redirect('./index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('chatMessage', function (data) {
        // we tell the client to execute 'new message'
        socket.emit('chatMessage', data);
        console.log(data);
    });
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

server.listen(3010, function () {
    console.log('Example app listening on port 3010!');
});
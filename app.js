/**
 * Created by Donny on 17/2/28.
 */
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require("body-parser");
var kpiPages = require('./controller/kpiPages');
var kpiContainers = require('./controller/kpiContainers');
var kpi1tems = require('./controller/kpi1tems');

var app = express();
var pages = kpiPages();
var containers = kpiContainers();
var items = kpi1tems();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/kpiPages', pages.list)
    .post('/api/kpiPages', pages.insert)
    .delete('/api/kpiPages/:id', pages.delete);

app.get('/api/kpiContainers', containers.list)
    .post('/api/kpiContainers', containers.insert)
    .delete('/api/kpiContainers/:id', containers.delete);

app.get('/api/kpi1tems', items.list)
    .post('/api/kpi1tems', items.insert)
    .delete('/api/kpi1tems/:id', items.delete);

app.post('/api/kpiPages/savePage', pages.findByID);

// io.on('connection', function (socket) {
//     console.log('a user connected');
//
//     socket.on('disconnect', function () {
//         console.log('user disconnected');
//     });
//
//     socket.on('chatMessage', function (data) {
//         // we tell the client to execute 'new message'
//         socket.emit('chatMessage', data);
//         console.log(data);
//     });
// });

server.listen(3010, function () {
    console.log('Example app listening on port 3010!');
});
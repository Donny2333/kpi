/**
 * Created by Donny on 17/3/15.
 */
var express = require('express');
var kpiPages = require('../controller/kpiPages');

var pages = kpiPages();
var router = express.Router();

router.get('/', pages.list)
    .post('/', pages.insertOrUpdate);

router.get('/:id', pages.getOne)
    .post('/delete', pages.delete);

module.exports = router;
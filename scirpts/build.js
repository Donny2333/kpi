/**
 * Created by Donny on 17/3/15.
 */
var Users = require('../models/users');
var KpiPages = require('../models/kpiPages');

// Users.sync({force: false}).then(function () {
//     Users.create({
//         NAME: 'admin',
//         NICK_NAME: 'Donny',
//         PASSWORD: '123',
//         CREATE_DATE: new Date().toLocaleString(),
//         CREATE_BY: 'admin',
//         CREATE_NAME: '管理员',
//         UPDATE_DATE: new Date().toLocaleString(),
//         UPDATE_BY: 'admin',
//         UPDATE_NAME: '管理员'
//     }).then(function () {
KpiPages.sync({force: false}).then(function () {
    KpiPages.create({
        TITLE: '这里是测试页面',
        CONTENT: '这里是测试页面内容',
        IS_SHOW: 'Y',
        SHOW_INDEX: 3,
        CREATE_BY: 'admin',
        CREATE_NAME: '管理员',
        UPDATE_BY: 'admin',
        UPDATE_NAME: '管理员'
    })
});
// })
// });


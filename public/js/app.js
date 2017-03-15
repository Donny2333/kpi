/**
 * Created by Donny on 17/3/12.
 */
(function () {
    'use strict';

    angular.module('KPIApp', ['KPIApp.routes', 'KPIApp.services'])
        .controller('AppController', function ($scope) {
            var vm = $scope.vm = {
                menus: [{
                    name: 'page1',
                    state: 'app.kpiPage1',
                    select: false
                }, {
                    name: 'page2',
                    state: 'app.kpiPage2',
                    select: false
                }, {
                    name: 'page3',
                    state: 'app.kpiPage3',
                    select: false
                }]
            };

            $scope.select = function (index) {
                vm.menus.map(function (m) {
                    m.select = false;
                });
                vm.menus[index].select = true;
            };

        })

        .controller('KpiController1', function (kpiService, $scope) {
            var date = new Date();
            var dateTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
            var vm = $scope.vm = {
                newPage: {
                    ID: 6,
                    TITLE: '这里是测试页面',
                    CONTENT: '这里是测试页面内容',
                    IS_SHOW: 'Y',
                    SHOW_INDEX: 3,
                    CREATE_BY: 'admin',
                    CREATE_NAME: '管理员',
                    UPDATE_BY: 'admin',
                    UPDATE_NAME: '管理员'
                }
            };

            $scope.select(0);

            $scope.create = function () {
                kpiService.post('/api/kpiPages', {page: vm.newPage});
            };

            $scope.delete = function () {
                kpiService.delete('/api/kpiPages', vm.newPage.ID);
            }
        })

        .controller('KpiController2', function (kpiService, $scope, $state) {
            var vm = $scope.vm = {
                tabs: []
            };

            $scope.select(1);

            kpiService.get('/api/kpiPages').then(function (res) {
                res.data.map(function (tab) {
                    vm.tabs.push(tab);
                });
                console.log(res.data);
            });

            $scope.edit = function (id) {
                $state.go('app.kpiPage3', {
                    id: id
                });
            };

            $scope.add = function () {
                $state.go('app.kpiPage1');
            }
        })

        .controller('KpiController3', function (kpiService, $scope, $stateParams) {
            var date = new Date();
            var dateTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
            var vm = $scope.vm = {
                newPage: {}
            };

            $scope.select(2);

            $scope.create = function () {
                kpiService.post('/api/kpiPages', {page: vm.newPage});
            };

            $scope.delete = function () {
                kpiService.delete('/api/kpiPages', vm.newPage.ID);
            };

            kpiService.get('/api/kpiPages', $stateParams.id).then(function (res) {
                vm.newPage = res.data;
            })
        });
}());
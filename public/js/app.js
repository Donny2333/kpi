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

            $scope.select(0);
        })

        .controller('KpiController', function (kpiService, $scope) {
            var date = new Date();
            var dateTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
            var vm = $scope.vm = {
                newPage: {
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
                }
            };

            $scope.create = function () {
                kpiService.create('/api/kpiPages', {page: vm.newPage});
            };

            $scope.delete = function () {
                kpiService.delete('/api/kpiPages', vm.newPage.id);
            }
        })

        .controller('KpiController2', function (kpiService, $scope, $state) {
            var vm = $scope.vm = {
                tabs: [{
                    id: 0,
                    name: 'tab0'
                }, {
                    id: 1,
                    name: 'tab1'
                }, {
                    id: 2,
                    name: 'tab2'
                }]
            };

            $scope.select(1);

            $scope.edit = function (id) {
                $state.go('app.kpiPage3', {
                    id: id
                });
            };

            $scope.add = function () {
                var id = vm.tabs.length;
                vm.tabs.push({
                    id: id,
                    name: 'tab' + id
                })
            }
        })

        .controller('KpiController3', function (kpiService, $scope, $stateParams) {
            console.log($stateParams);
            $scope.select(2);
        });
}());
/**
 * Created by Donny on 17/3/16.
 */
(function () {
    'use strict';

    angular.module('KPIApp.controllers', [])
        .controller('AppController', function ($scope, $state, $timeout) {
            var vm = $scope.vm = {
                select: 0,
                tabs: [{
                    id: 0,
                    name: '主页',
                    state: 'kpi.home',
                    select: true
                }],
                menus: [{
                    id: 1,
                    name: '页面管理',
                    state: 'kpi.pages',
                    open: false
                }, {
                    id: 2,
                    name: '用户管理',
                    state: 'kpi.users',
                    open: false
                }, {
                    id: 3,
                    name: '权限管理',
                    state: 'kpi.rights',
                    open: false
                }]
            };

            // 更新新select，将旧select归零
            $scope.select = function (index) {
                vm.tabs[vm.select].select = false;
                vm.select = index;
                vm.tabs[vm.select].select = true;
                $state.go(vm.tabs[vm.select].state);
            };

            $scope.open = function (menu) {
                if (!menu.open) {
                    var tab = {
                        id: menu.id,
                        name: menu.name,
                        state: menu.state,
                        select: false
                    };
                    vm.tabs.push(tab);
                    menu.open = true;
                    $scope.select(vm.tabs.length - 1);
                } else {
                    for (var i = 0; i <= vm.tabs.length - 1; i++) {
                        if (vm.tabs[i].id == menu.id) {
                            $scope.select(i);
                            break;
                        }
                    }
                }
            };

            $scope.close = function (index, $event) {
                $event.stopPropagation();

                vm.menus.map(function (m) {
                    if (m.open && m.id == vm.tabs[index].id) {
                        m.open = false;
                    }
                });

                if (vm.select >= index) {
                    vm.select--;
                    vm.tabs.splice(index, 1);
                    $scope.select(vm.select);
                }
            };

            $scope.select(vm.select);
        })
}());
/**
 * Created by Donny on 17/3/12.
 */
(function () {
    'use strict';

    angular.module('KPIApp', ['KPI.Directives', 'KPIApp.routes', 'KPIApp.services', 'ui.bootstrap'])
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
                console.log(111);

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
                console.log(222);
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

        .controller('HomeController', function (kpiService, $scope, $uibModal, $log, $document) {

        })

        .controller('PageController', function (kpiService, $scope, $uibModal, $log, $document) {
            var vm = $scope.vm = {
                pages: [],
                items: ['item1', 'item2', 'item3'],
                selected: null
            };

            $scope.open = function (size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
                var modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: '$ctrl',
                    size: size,
                    appendTo: parentElem,
                    resolve: {
                        items: function () {
                            return vm.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    vm.selected = selectedItem;
                    console.log(selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            kpiService.get('/api/kpiPages').then(function (res) {
                vm.pages = res.data;
            })
        })

        .controller('userController', function (kpiService, $scope, $state) {
            var vm = $scope.vm = {
                tabs: []
            };
        })

        .controller('rightController', function (kpiService, $scope, $stateParams) {
            var vm = $scope.vm = {
                newPage: {}
            };
        })

        .controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
            var $ctrl = this;
            $ctrl.items = items;
            $ctrl.selected = {
                item: $ctrl.items[0]
            };

            $ctrl.ok = function () {
                $uibModalInstance.close($ctrl.selected.item);
            };

            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });
}());
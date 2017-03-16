/**
 * Created by Donny on 17/3/16.
 */
(function () {
    'use strict';

    angular.module('KPIApp.controllers')
        .controller('PageController', function (kpiService, $scope, $uibModal, $log, $document) {
            var vm = $scope.vm = {
                checkAll: false,
                checked: 0,
                pages: [],
                table: {
                    th: ['#', '标题', '是否显示', '排序', '创建时间', '创建人', '修改时间', '修改人'],
                    td: ['ID', 'TITLE', 'IS_SHOW', 'SHOW_INDEX', 'CREATE_DATE', 'CREATE_NAME', 'UPDATE_DATE', 'UPDATE_NAME']
                },
                items: ['item1', 'item2', 'item3'],
                selected: null
            };

            $scope.check = function (page) {
                if (page.checked) {
                    vm.checked--;
                } else {
                    vm.checked++;
                }
                page.checked = !page.checked;
            };

            $scope.checkAll = function () {
                vm.checkAll = !vm.checkAll;
                vm.pages.map(function (page) {
                    page.checked = vm.checkAll;
                });
                vm.checked = vm.checkAll ? vm.pages.length : 0;
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
                vm.pages.map(function (page) {
                    page.checked = false;
                })
            })
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
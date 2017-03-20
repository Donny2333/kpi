/**
 * Created by Donny on 17/3/16.
 */
(function () {
    'use strict';

    angular.module('KPIApp.controllers')
        .controller('PageController', function (kpiService, $scope, $uibModal, $log, $timeout) {
            var vm = $scope.vm = {
                checkAll: false,
                checked: 0,
                pages: [],
                table: {
                    th: ['标题', '是否显示', '排序', '创建时间', '创建人', '修改时间', '修改人'],
                    td: ['TITLE', 'IS_SHOW', 'SHOW_INDEX', 'CREATE_DATE', 'CREATE_NAME', 'UPDATE_DATE', 'UPDATE_NAME']
                },
                newPage: {
                    TITLE: '',
                    SHOW_INDEX: 1,
                    IS_SHOW: 'Y'
                }
            };

            $scope.check = function (page) {
                if (page.checked) {
                    vm.checked--;
                } else {
                    vm.checked++;
                }

                page.checked = !page.checked;

                vm.checkAll = _.isEqual(vm.pages.length, _.countBy(vm.pages, 'checked')['true']);
            };

            $scope.checkAll = function () {
                vm.pages.map(function (page) {
                    page.checked = vm.checkAll;
                });
                vm.checked = vm.checkAll ? vm.pages.length : 0;
            };

            var uuid = {};

            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            uuid.create = function () {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };

            $scope.open = function () {
                var newPage = vm.newPage;
                if (vm.checked == 1) {
                    newPage = _.find(vm.pages, 'checked');
                }

                var modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        newPage: newPage
                    }
                });

                modalInstance.result.then(function (newPage) {
                    kpiService.post('http://localhost:3010/api/kpiPages', {
                        page: {
                            ID: newPage.ID || uuid.create().toString(),
                            TITLE: newPage.TITLE,
                            IS_SHOW: newPage.IS_SHOW,
                            SHOW_INDEX: newPage.SHOW_INDEX,
                            CREATE_DATE: new Date().toDateString(),
                            CREATE_BY: 'admin',
                            CREATE_NAME: '管理员',
                            UPDATE_DATE: new Date().toDateString(),
                            UPDATE_BY: 'admin',
                            UPDATE_NAME: '管理员'
                        }
                    }).then(function (res) {
                        if (vm.checked == 1) {
                            vm.pages.map(function (page) {
                                if (page.ID == res.data.ID) {
                                    page = res.data;
                                }
                            });
                        }
                        else {
                            vm.pages.push(res.data);
                        }
                    })

                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            };

            $scope.delete = function () {
                var ids = [];

                vm.pages.map(function (page) {
                    if (page.checked) {
                        ids.push(page.ID);
                    }
                });

                kpiService.post('http://localhost:3010/api/kpiPages/delete', {
                    ids: ids
                }).then(function () {
                    reload();
                })
            };

            var reload = function () {
                kpiService.get('http://localhost:3010/api/kpiPages').then(function (res) {
                    vm.pages = res.data;
                    vm.pages.map(function (page) {
                        page.checked = false;
                    });

                    vm.checkAll = false;
                    vm.checked = 0;
                })
            };

            reload();
        })

        .controller('ModalInstanceCtrl', function ($uibModalInstance, $scope, newPage) {
            var vm = $scope.vm = {
                newPage: newPage,
                error: false,
                errorMsg: ''
            };

            $scope.ok = function () {
                if (vm.newPage.TITLE.length == 0) {
                    vm.error = true;
                    vm.errorMsg = '标题不能为空！';
                } else if (!vm.newPage.SHOW_INDEX) {
                    vm.error = true;
                    vm.errorMsg = '排序不能为空！';
                } else {
                    $uibModalInstance.close(vm.newPage);
                    vm.error = false;
                }
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
                vm.error = false;
            };
        });
}());
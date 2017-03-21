/**
 * Created by Donny on 17/3/16.
 */
(function () {
    'use strict';

    angular.module('KPIApp.controllers')
        .controller('PageController', function (kpiService, $scope, $uibModal, $log, uuid) {
            var host = 'http://192.168.99.240:3010/';
            var vm = $scope.vm = {
                table: {
                    th: ['标题', '显示', '排序', '创建时间', '创建人', '修改时间', '修改人'],
                    td: ['TITLE', 'IS_SHOW', 'SHOW_INDEX', 'CREATE_DATE', 'CREATE_NAME', 'UPDATE_DATE', 'UPDATE_NAME']
                },
                checked: 0
            };

            var create = function () {
                $scope.open();
            };

            var edit = function () {
                var selects = $('#tb_pages').bootstrapTable('getSelections');
                $scope.open(selects[0]);
            };

            $scope.open = function (select) {
                var newPage = {
                    TITLE: '',
                    SHOW_INDEX: 1,
                    IS_SHOW: 'Y'
                };

                if (select) {
                    newPage = select;
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
                    kpiService.post(host + 'api/kpiPages', {
                        page: {
                            ID: newPage.ID || uuid.create().toString(),
                            TITLE: newPage.TITLE,
                            IS_SHOW: newPage.IS_SHOW,
                            SHOW_INDEX: newPage.SHOW_INDEX,
                            CREATE_DATE: new Date(),
                            CREATE_BY: 'admin',
                            CREATE_NAME: '管理员',
                            UPDATE_DATE: new Date(),
                            UPDATE_BY: 'admin',
                            UPDATE_NAME: '管理员'
                        }
                    }).then(function (res) {
                        $('#tb_pages').bootstrapTable('refresh', {silent: true});
                    })

                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            };

            var _delete = function () {
                var selects = $('#tb_pages').bootstrapTable('getSelections');
                var ids = _.map(selects, 'ID');

                kpiService.post(host + 'api/kpiPages/delete', {
                    ids: ids
                }).then(function (res) {
                    $('#tb_pages').bootstrapTable('refresh', {silent: true});
                })
            };

            var TableInit = function () {
                var oTableInit = {};
                //初始化Table
                oTableInit.Init = function () {
                    $('#tb_pages').bootstrapTable({
                        url: host + 'api/kpiPages',        //请求后台的URL（*）
                        method: 'get',                      //请求方式（*）
                        toolbar: '#toolbar',                //工具按钮用哪个容器
                        striped: true,                      //是否显示行间隔色
                        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                        pagination: true,                   //是否显示分页（*）
                        sortable: false,                    //是否启用排序
                        sortOrder: "asc",                   //排序方式
                        queryParams: oTableInit.queryParams,//传递参数（*）
                        // sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                        pageNumber: 1,                      //初始化加载第一页，默认第一页
                        pageSize: 10,                       //每页的记录行数（*）
                        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
                        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                        strictSearch: true,
                        showColumns: true,                  //是否显示所有的列
                        showRefresh: true,                  //是否显示刷新按钮
                        minimumCountColumns: 2,             //最少允许的列数
                        clickToSelect: true,                //是否启用点击选中行
                        height: 505,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                        uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
                        showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
                        cardView: false,                    //是否显示详细视图
                        detailView: false,                  //是否显示父子表
                        columns: [{
                            checkbox: true
                        }, {
                            field: 'ID',
                            title: '#'
                        }, {
                            field: 'TITLE',
                            title: '标题'
                        }, {
                            field: 'IS_SHOW',
                            title: '显示'
                        }, {
                            field: 'SHOW_INDEX',
                            title: '排序'
                        }, {
                            field: 'CREATE_DATE',
                            title: '创建时间'
                        }, {
                            field: 'CREATE_NAME',
                            title: '创建者'
                        }, {
                            field: 'UPDATE_DATE',
                            title: '更新时间'
                        }, {
                            field: 'UPDATE_NAME',
                            title: '更新者'
                        }],
                        onCheck: function () {
                            vm.checked++;
                        },
                        onUncheck: function () {
                            vm.checked--;
                        }
                    });
                };

                //得到查询的参数
                oTableInit.queryParams = function (params) {
                    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                        limit: params.limit,   //页面大小
                        offset: params.offset,  //页码
                        departmentname: $("#txt_search_departmentname").val(),
                        statu: $("#txt_search_statu").val()
                    };
                    return temp;
                };

                return oTableInit;
            };

            var ButtonInit = function () {
                var oButton = {};
                oButton.Init = function () {

                    // JQuery failed to bind click function
                    var btn_create = document.getElementById('btn_create');
                    btn_create.onclick = create;

                    var btn_edit = document.getElementById('btn_edit');
                    btn_edit.onclick = edit;

                    var btn_delete = document.getElementById('btn_delete');
                    btn_delete.onclick = _delete;

                };
                return oButton;
            };

            var init = function () {

                // 1.初始化Table
                var oTable = new TableInit();
                oTable.Init();

                // 2.初始化Button的点击事件
                var oButtonInit = new ButtonInit();
                oButtonInit.Init();
            };

            init();
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
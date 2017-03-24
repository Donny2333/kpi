/**
 * Created by Donny on 17/3/16.
 */
(function () {
    'use strict';

    angular.module('KPIApp.directives', [])
        .directive('pageTable', function (host, $window) {

            return {
                restrict: 'E',
                templateUrl: '../tpls/page-table.html',
                replace: true,
                transclude: true,
                scope: {
                    ngCreate: '=',
                    ngEdit: '=',
                    ngDelete: '=',
                    table: '='
                },
                link: function (scope, element, attrs) {
                    scope.vm = {
                        checked: 0
                    };
                    scope.table = element.children("table");

                    scope.table.bootstrapTable({
                        url: host + 'api/kpiPages',        //请求后台的URL（*）
                        method: 'get',                      //请求方式（*）
                        toolbar: '#toolbar',                //工具按钮用哪个容器
                        striped: true,                      //是否显示行间隔色
                        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                        pagination: true,                   //是否显示分页（*）
                        sortable: false,                    //是否启用排序
                        sortOrder: "asc",                   //排序方式
                        // sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                        pageNumber: 1,                      //初始化加载第一页，默认第一页
                        pageSize: 15,                       //每页的记录行数（*）
                        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                        showColumns: true,                  //是否显示所有的列
                        showRefresh: true,                  //是否显示刷新按钮
                        clickToSelect: true,                //是否启用点击选中行
                        buttonsClass: 'btn btn-primary',
                        columns: [
                            {
                                checkbox: true,
                                align: 'center'
                            }, {
                                field: 'ID',
                                title: '#',
                                align: 'center'
                            }, {
                                field: 'TITLE',
                                title: '标题',
                                align: 'center'
                            }, {
                                field: 'IS_SHOW',
                                title: '显示',
                                align: 'center'
                            }, {
                                field: 'SHOW_INDEX',
                                title: '排序',
                                align: 'center'
                            }, {
                                field: 'CREATE_DATE',
                                title: '创建时间',
                                align: 'center'
                            }, {
                                field: 'CREATE_NAME',
                                title: '创建者',
                                align: 'center'
                            }, {
                                field: 'UPDATE_DATE',
                                title: '更新时间',
                                align: 'center'
                            }, {
                                field: 'UPDATE_NAME',
                                title: '更新者',
                                align: 'center'
                            }, {
                                title: '页面编辑',
                                align: 'center',
                                clickToSelect: false,
                                formatter: function () {
                                    return '<a class="jump"><i class="glyphicon glyphicon-new-window"></i></a>'
                                },
                                events: {
                                    'click .jump': function () {
                                        $window.open('/kpiPages', '_blank');
                                    }
                                }
                            }
                        ],
                        onCheck: function () {
                            scope.$apply(function () {
                                scope.vm.checked++;
                            });
                        },
                        onUncheck: function () {
                            scope.$apply(function () {
                                scope.vm.checked--;
                            });
                        },
                        onRefresh: function () {
                            scope.vm.checked = 0;
                        }
                    });
                }
            }
        });
}());
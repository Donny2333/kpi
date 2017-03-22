/**
 * Created by Donny on 17/3/16.
 */
(function () {
    'use strict';

    angular.module('KPI.directives', [])
        .directive('href', function () {
            return {
                compile: function (element) {
                    element.attr('target', '_blank');
                }
            };
        })

        .directive('pageTable', function () {
            return {
                restrict: 'E',
                templateUrl: '/page-table.html',
                replace: true,
                transclude: true,
                scope: {},
                link: function (scope, element, attrs) {
                    // element[0].bootstrapTable({
                    //     url: host + 'api/kpiPages',        //请求后台的URL（*）
                    //     method: 'get',                      //请求方式（*）
                    //     toolbar: '#toolbar',                //工具按钮用哪个容器
                    //     striped: true,                      //是否显示行间隔色
                    //     cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    //     pagination: true,                   //是否显示分页（*）
                    //     sortable: true,                    //是否启用排序
                    //     sortOrder: "asc",                   //排序方式
                    //     queryParams: oTableInit.queryParams,//传递参数（*）
                    //     // sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                    //     pageNumber: 1,                      //初始化加载第一页，默认第一页
                    //     pageSize: 20,                       //每页的记录行数（*）
                    //     search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                    //     showColumns: true,                  //是否显示所有的列
                    //     showRefresh: true,                  //是否显示刷新按钮
                    //     minimumCountColumns: 2,             //最少允许的列数
                    //     clickToSelect: true,                //是否启用点击选中行
                    //     buttonsClass: 'btn btn-primary',
                    //     columns: [{
                    //         checkbox: true
                    //     }, {
                    //         field: 'ID',
                    //         title: '#'
                    //     }, {
                    //         field: 'TITLE',
                    //         title: '标题'
                    //     }, {
                    //         field: 'IS_SHOW',
                    //         title: '显示'
                    //     }, {
                    //         field: 'SHOW_INDEX',
                    //         title: '排序'
                    //     }, {
                    //         field: 'CREATE_DATE',
                    //         title: '创建时间'
                    //     }, {
                    //         field: 'CREATE_NAME',
                    //         title: '创建者'
                    //     }, {
                    //         field: 'UPDATE_DATE',
                    //         title: '更新时间'
                    //     }, {
                    //         field: 'UPDATE_NAME',
                    //         title: '更新者'
                    //     }],
                    //     onCheck: function () {
                    //         vm.checked++;
                    //     },
                    //     onUncheck: function () {
                    //         vm.checked--;
                    //     }
                    // });
                }
            }
        });
}());
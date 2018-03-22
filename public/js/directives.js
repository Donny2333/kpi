/**
 * Created by Donny on 17/3/16.
 */
(function () {
  'use strict'

  angular.module('KPIApp.directives', [])
    .directive('kpiChart', function () {
      return {
        restrict: 'E',
        template: '<div ng-style="userStyle"></div>',
        replace: true,
        scope: {
          data: '=',
          userStyle: '='
        },
        link: function (scope, element, attrs) {
          var myChat = null

          if (scope.data) {
            // 基于准备好的dom，初始化echarts实例
            myChat = echarts.init(element[0])

            // 使用刚指定的配置项和数据显示图表
            myChat.setOption(scope.data)
          }

          //监听DOM元素
          scope.$watch('data', function (value) {
            if (value && value.hasOwnProperty('series')) {
              if (!myChat) {
                // echarts实例未准备好
                myChat = echarts.init(element[0])
              }

              if (value.series) {
                myChat.setOption(scope.data, true)
              }
            }
          })

          scope.$watch('userStyle', function (value) {
            if (value && myChat) {
              myChat.resize()
            }
          })
        }
      }
    })
}())

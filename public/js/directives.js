/**
 * Created by Donny on 17/3/16.
 */
(function () {
    'use strict';

    angular.module('KPI.Directives', [])
        .directive('href', function () {
            return {
                compile: function (element) {
                    element.attr('target', '_blank');
                }
            };
        });
}());
/**
 * Created by Donny on 17/3/14.
 */
(function () {
    'use strict';

    angular.module('KPIApp.routes', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/app/kpiPage1');

            $stateProvider
                .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: '../tpls/menu.html',
                    controller: 'AppController'
                })
                .state('app.kpiPage1', {
                    url: '/kpiPage1',
                    templateUrl: '../tpls/kpiPage1.html',
                    controller: 'KpiController1'
                })
                .state('app.kpiPage2', {
                    url: '/kpiPage2',
                    templateUrl: '../tpls/kpiPage2.html',
                    controller: 'KpiController2'
                })
                .state('app.kpiPage3', {
                    url: '/kpiPage3',
                    templateUrl: '../tpls/kpiPage3.html',
                    controller: 'KpiController3',
                    params: {
                        id: null
                    }
                });
        });
}());
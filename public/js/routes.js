/**
 * Created by Donny on 17/3/14.
 */
(function () {
    'use strict';

    angular.module('KPIApp.routes', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/kpi/home');

            $stateProvider
                .state('kpi', {
                    url: '/kpi',
                    abstract: true,
                    templateUrl: '../tpls/menu.html',
                    controller: 'AppController'
                })
                .state('kpi.home', {
                    url: '/home',
                    templateUrl: '../tpls/home.html',
                    controller: 'HomeController'
                })
                .state('kpi.pages', {
                    url: '/pages',
                    templateUrl: '../tpls/pages.html',
                    controller: 'PageController'
                })
                .state('kpi.users', {
                    url: '/users',
                    templateUrl: '../tpls/users.html',
                    controller: 'UserController'
                })
                .state('kpi.rights', {
                    url: '/rights',
                    templateUrl: '../tpls/rights.html',
                    controller: 'RightController'
                });
        });
}());
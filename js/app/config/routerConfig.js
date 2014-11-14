define(
    [
        'app',
        'resource/appResource',
        'factory/appFactory',
        'factory/notificationFactory',
        'controller/mainAppCtrl',
        'controller/introCtrl',
        'controller/userCtrl',
        'controller/teamCtrl',
        'controller/gameCtrl'
    ],
    function (app) {

        'use strict';

        return app.config([

            '$stateProvider',
            '$urlRouterProvider',

            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise("/intro");

                $stateProvider
                    .state('intro', {
                        url: "/intro",
                        templateUrl: "templates/intro-template.html",
                        controller : 'mainAppCtrl'
                    }).state('game', {
                        url: "/game/:tournaments_id",
                        templateUrl: "templates/game-template.html",
                        controller : 'mainAppCtrl'
                    });
            }
        ]);
    }
);



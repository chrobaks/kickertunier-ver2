(function() {
    
    "use strict";
    
    angular
        .module('mainApp')
        .config( function($stateProvider, $urlRouterProvider){
            
            $urlRouterProvider.otherwise("");
            
            $stateProvider
            .state('index', {
                url: "",
                controller: 'mainAppCtrl',
                templateUrl: "templates/game-template.html"
            });
            
            /*    
            $urlRouterProvider.otherwise("/game");
            
            $stateProvider
            .state('intro', {
                url: "/intro",
                controller: 'mainAppCtrl',
                templateUrl: "templates/intro-template.html"
            }).state('game', {
                url: "/game",
                controller: 'mainAppCtrl',
                templateUrl: "templates/game-template.html"
            });*/
        });
})();
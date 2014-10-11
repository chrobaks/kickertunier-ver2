(function() {
    "use strict";

    angular.module('mainApp', ['ui.router', 'ngGrid', 'mainAppFilter', 'mainAppFactory']);
    /**/
    angular.module('mainApp').config(
        function($stateProvider, $urlRouterProvider){
            
            $urlRouterProvider.otherwise("");
            
            $stateProvider
            .state('index', {
                url: "",
                controller: 'gameCtrl',
                templateUrl: "templates/game-template.html"
            });
        }
    );
    
})();


(function() {
    "use strict";

    angular.module('mainApp', ['ui.router', 'mainAppFilter', 'mainAppFactory']);
    
    angular.module('mainApp').config(
        function($stateProvider, $urlRouterProvider){
            
            $urlRouterProvider.otherwise("");
            
            $stateProvider
            .state('index', {
                url: "",
                controller: 'mainAppCtrl',
                templateUrl: "templates/game-template.html"
            });
        }
    );
    
})();

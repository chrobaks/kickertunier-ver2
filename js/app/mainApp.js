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
                controller: 'gameController',
                views: {
                    "viewUser": { 
                        templateUrl: "templates/user-template.html" 
                    },
                    "viewTeam": { 
                        templateUrl: "templates/team-template.html" 
                    },
                    "viewGame": { 
                        templateUrl: "templates/game-template.html" 
                    }
                }
            });
        }
    );
    
})();



define('mainApp',[
        'angular',
        'uiRouter',
        'ngResource',
        'app/filter/mainAppFilter',
        'app/factory/appFactory'
    ],
    function ( angular ) {
    
        "use strict";
    
        var mainApp = angular.module('mainApp', ['ui.router', 'ngResource', 'mainAppFilter', 'mainAppFactory']);
    
        return mainApp;
    
    }
);





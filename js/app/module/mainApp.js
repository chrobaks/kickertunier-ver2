define([
    'angular',
    'uiRouter',
    'ngResource'
    //'app/filter/mainAppFilter',
    //'app/factory/appFactory'
],function ( angular ) {

    "use strict";

    //angular.module('mainApp', ['ui.router', 'mainAppFilter', 'mainAppFactory', 'ngResource']);
    var mainApp = angular.module('mainApp', ['ui.router', 'ngResource']);

    return mainApp;

});





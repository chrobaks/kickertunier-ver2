define([
    'angular',
    'uiRouter',
    'ngResource',
    'filter/mainAppFilter',
    'factory/mainAppFactory'
],function ( angular ) {

    "use strict";

    var module = angular.module('mainApp', ['ui.router', 'mainAppFilter', 'mainAppFactory', 'ngResource']);

    return module;

});





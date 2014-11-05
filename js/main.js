"use strict";

require.config({

    baseUrl : './js',
    paths   : {
        'angular'     : './lib/angular',
        'ngResource'  : './lib/angular-resource',
        'uiRouter'    : './lib/angular-ui-router',
        'jQuery'      : './lib/jquery-1.7.2'
    },
    shim    : {
        'jQuery'     : {
            'exports' : 'jQuery'
        },
        'angular'    : {
            'exports' : 'angular'
        },
        'ngResource' : {
            'exports' : 'ngResource',
            'deps'    : ['angular']
        },
        'uiRouter' : {
            'exports' : 'uiRouter',
            'deps'    : ['angular']
        }
    },
    deps: ['./app/module/mainApp']

});

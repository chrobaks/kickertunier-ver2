require.config({
    baseUrl: 'js/app',
    /**/
    paths: {
        'angular'      : '../../lib/angular/angular',
        'hint'         : '../../../angular-hint/hint',
        'ngResource'   : '../../lib/angular-resource/angular-resource',
        'ui.router'    : '../../lib/angular-ui-router/angular-ui-router',
        'smart-table'  : '../../lib/angular-smart-table/dist/smart-table.min',
        'jquery'       : '../../lib/jquery/jquery'
    },
    shim: {
        'angular'     : { 
            exports     : 'angular' 
        },
        'hint': {
            deps        : ['angular']
        },
        'ngResource': {
            deps        : ['angular']
        },
        'ui.router'   : {
            deps        : ['angular']
        },
        'smart-table'   : {
            deps        : ['angular']
        },
        'jquery'     : { 
            exports     : 'jquery' 
        }
    },
    callback: function () {
        
        'use strict';
        
        require([
            'angular',
            'config/routerConfig'
            
        ], function (angular) {

            angular.bootstrap(document, ['app']);
            
        });
    }
    
});

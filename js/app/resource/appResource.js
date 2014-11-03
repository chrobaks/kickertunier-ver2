(function () {
    
    "use strict";

    angular
        .module('mainApp')
        .factory('appResource', ['$resource',
            function ($resource) {
                var url = "/kickertunier-ver2/rest/request.php";
                var config = {
                    'getAll': {
                        method: 'GET',
                        isArray: true
                    },
                    'set': {
                        method: 'PUT'
                    },
                    'del': {
                        method: 'DELETE'
                    }
                };
                return {
                    intro     : $resource(url + '/tournaments/:id', {id: '@id'}, config),
                    user      : $resource(url + '/users/:tournaments_id/:id', {tournaments_id: '@tournaments_id',id: '@id'}, config),
                    team      : $resource(url + '/teams/:tournaments_id/:id', {tournaments_id: '@tournaments_id',id: '@id'}, config),
                    game      : $resource(url + '/games/:tournaments_id/:id', {tournaments_id: '@tournaments_id',id: '@id'}, config),
                    scorelist : $resource(url + '/scorelist/:tournaments_id/:id', {tournaments_id: '@tournaments_id',id: '@id'}, {
                        'getAll': {
                            method: 'GET',
                            isArray: true
                        }
                    })
                }
            }]
        );
})();
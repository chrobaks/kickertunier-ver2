(function() {
    "use strict";

    angular.module('mainApp').factory('appResource', ['$resource',
        function ($resource) {
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
                user : $resource('/kickertunier-ver2/rest/request.php/users', null,config),
                team : $resource('/kickertunier-ver2/rest/request.php/teams', null,config)
            }
        }]
    );
})();
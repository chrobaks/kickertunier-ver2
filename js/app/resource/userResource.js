(function() {
    "use strict";

    angular.module('mainApp').factory('userResource', ['$resource',
        function ($resource) {
            return $resource('/kickertunier-ver2/rest/request.php/users', null,
            {
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
            });
        }]
    );
})();
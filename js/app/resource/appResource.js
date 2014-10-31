(function() {
    "use strict";

    angular.module('mainApp').factory('appResource', ['$resource',
        function ($resource) {
            var url = "/kickertunier-ver2/rest/request.php";
            var config = {
                'getAll': {
                    method  : 'GET',
                    isArray : true
                },
                'set': {
                    method  : 'PUT'
                },
                'del': {
                    method  : 'DELETE'
                }
            };
            return {
                user      : $resource(url+'/users/:id',{id:'@id'},config),
                team      : $resource(url+'/teams/:id',{id:'@id'},config),
                game      : $resource(url+'/games/:id',{id:'@id'},config),
                scorelist : $resource(url+'/scorelist/:id',{id:'@id'},{'getAll':{method: 'GET',isArray: true}})
            }
        }]
    );
})();
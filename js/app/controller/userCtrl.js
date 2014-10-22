(function() {
    "use strict";

    angular.module('mainApp').controller('userCtrl', userCtrl);

    userCtrl.$inject = [
        '$scope',
        'userFactory',
        'autoidFactory'
    ];

    function userCtrl ( $scope, userFactory, autoidFactory) {
        // scope users

        /*
        function activate() {
            userService.get().$promise.then(function(data) {
                $scope.users = data;
            });
        }

        activate();
        */

        $scope.users = userFactory.get();
        // scope users userAutoId
        $scope.users.userAutoId = autoidFactory.getFuncautoId($scope.users.userData);
        // add user
        $scope.addUser = addUser;
        // delete user
        $scope.deleteUser = deleteUser;
        // func
        function addUser() {
            userFactory.addUser($scope.userForm);
        }
        function deleteUser(id) {
            userFactory.deleteUser(id);
        }
    }
})();

(function() {
    "use strict";

    angular.module('mainApp').controller('userCtrl', UserCtrl);

    UserCtrl.$inject = [
        '$scope',
        'UserFactory',
        'AutoIdFactory',
        'GridFactory'
    ];

    function UserCtrl ( $scope, UserFactory, AutoIdFactory, GridFactory) {

        // SCOPE VAR users
        $scope.users = UserFactory.get();
        $scope.users.userAutoId = AutoIdFactory.getFuncautoId($scope.users.userData);

        GridFactory.setGridOptonsUser($scope);

        // ADD USER
        $scope.addUser = addUser;
        // DELETE USER
        $scope.deleteUser = deleteUser;

        function addUser() {
            UserFactory.addUser($scope);
        }
        function deleteUser(id) {
            UserFactory.deleteUser(id, $scope);
        }
    }
})();

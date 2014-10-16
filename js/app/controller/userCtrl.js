(function() {
    "use strict";

    angular.module('mainApp').controller('userCtrl', UserCtrl);

    UserCtrl.$inject = [
        '$scope',
        'UserFactory',
        'AutoIdFactory'
    ];

    function UserCtrl ( $scope, UserFactory, AutoIdFactory) {

        // SCOPE VAR users
        $scope.users = UserFactory.get();
        $scope.userAutoId = AutoIdFactory.getFuncautoId($scope.users.userData);
        $scope.gridOptionsUser = {
            data: 'users.userData',
            columnDefs: 'users.userColumnsDef'
        };

        // ADD USER
        $scope.addUser = addUser;
        // DELETE USER
        $scope.deleteUser = deleteUser;

        function addUser() {
            $scope.users.userData.push( $scope.user);
        }
        function deleteUser(id) {
            $scope.users.userData.splice( $scope.userData.indexOf(id), 1);
        }

    }
})();

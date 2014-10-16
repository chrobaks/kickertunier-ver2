(function() {
    "use strict";

    angular.module('mainApp').controller('userCtrl', UserCtrl);

    UserCtrl.$inject = [
        '$scope',
        'UserFactory',
        'AutoIdFactory',
        'GridFactory',
        'notificationFactory'
    ];

    function UserCtrl ( $scope, UserFactory, AutoIdFactory, GridFactory, notificationFactory) {

        // SCOPE VAR users
        $scope.users = UserFactory.get();
        $scope.userAutoId = AutoIdFactory.getFuncautoId($scope.users.userData);

        GridFactory.setGridOptonsUser($scope);

        // ADD USER
        $scope.addUser = addUser;
        // DELETE USER
        $scope.deleteUser = deleteUser;

        notificationFactory.on('addUser', function() {

        });

        notificationFactory.on('deleteUser', function(id) {

        });

        /**/
        function addUser() {
            $scope.userData.push( $scope.user);
        }
        function deleteUser(id) {
            $scope.userData.splice( $scope.userData.indexOf(id), 1);
        }

    }
})();

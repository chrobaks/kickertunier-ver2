(function() {
    "use strict";

    angular.module('mainApp').controller('userCtrl', UserCtrl);

    UserCtrl.$inject = [
        '$scope',
        'UserFactory',
        'AutoIdFactory',
        'notificationFactory'
    ];

    function UserCtrl ( $scope, UserFactory, AutoIdFactory, notificationFactory) {

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
            notificationFactory.trigger('addUser',$scope.user);
        }
        function deleteUser(id) {
            $scope.users.userData.splice( $scope.userData.indexOf(id), 1);
        }


    }
})();

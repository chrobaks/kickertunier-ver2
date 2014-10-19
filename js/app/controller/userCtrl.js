(function() {
    "use strict";

    angular.module('mainApp').controller('userCtrl', userCtrl);

    userCtrl.$inject = [
        '$scope',
        'userFactory',
        'AutoIdFactory'
    ];

    function userCtrl ( $scope, userFactory, AutoIdFactory) {
        console.log("userCtrl")
        // scope users
        $scope.users = userFactory.get();
        // scope users userAutoId
        $scope.users.userAutoId = AutoIdFactory.getFuncautoId($scope.users.userData);
        // scope gridOptions
        $scope.gridOptionsUser = {
            data: 'users.userData',
            columnDefs: 'users.userColumnsDef'
        };
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

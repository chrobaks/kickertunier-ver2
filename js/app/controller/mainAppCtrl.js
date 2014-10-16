(function() {
    "use strict";

    angular.module('mainApp').controller('mainAppCtrl', MainAppCtrl);

    MainAppCtrl.$inject = [
        '$scope'
    ];

    function MainAppCtrl( $scope) {

        $scope.show = {
            user: false,
            team: false
        };

        $scope.toggleTab = function (tab) {
            $scope.show[tab] = !$scope.show[tab];
        };

    }
})();
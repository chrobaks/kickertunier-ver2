(function() {
    "use strict";

    angular.module('mainApp').controller('mainAppCtrl', mainAppCtrl);

    mainAppCtrl.$inject = [
        '$scope',
        'notificationFactory'
    ];

    function mainAppCtrl( $scope, notificationFactory ) {
        
        $scope.show = {};
        
        $scope.toggleTab = function (tab) {
            $scope.show[tab] = !$scope.show[tab];
        };
        
        $scope.$on('$viewContentLoaded',function(){
            notificationFactory.trigger('init',[]);
        });
    }
})();
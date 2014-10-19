(function() {
    "use strict";

    angular.module('mainApp').controller('mainAppCtrl', MainAppCtrl);

    MainAppCtrl.$inject = [
        '$scope',
        'notificationFactory'
    ];

    function MainAppCtrl( $scope, notificationFactory ) {
        
        $scope.show = {};
        
        $scope.toggleTab = function (tab) {
            $scope.show[tab] = !$scope.show[tab];
        };
        
        $scope.$on('$viewContentLoaded',function(){
            notificationFactory.trigger('init',[]);
        });
    }
})();
(function() {
    "use strict";

    angular.module('mainApp').controller('mainAppCtrl', MainAppCtrl);

    MainAppCtrl.$inject = [
        '$scope',
        'TplFactory',
    ];

    function MainAppCtrl( $scope, TplFactory) {

        $scope.tpl = TplFactory.get();
        $scope.showTabWrapper = showTabWrapper;

        function showTabWrapper ($event){
            TplFactory.showTabWrapper($event);
        }
    }
})();
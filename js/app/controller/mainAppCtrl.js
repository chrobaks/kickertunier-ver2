define(
    [
        'app',
        'filter/appFilter'
    ],
    function (app) {
    
    "use strict";

    app.controller('mainAppCtrl', mainAppCtrl);

    mainAppCtrl.$inject = [
        '$stateParams'
    ];
    
    function mainAppCtrl( $stateParams) {

        var vm = this;
        vm.tournaments_id = (typeof $stateParams.tournaments_id != 'undefined') ? $stateParams.tournaments_id: "";
        vm.show           = {};
        vm.toggleTab      = toggleTab;
        
        vm.title = 'Hello mainAppCtrl!';
        
        function toggleTab (tab) {
            vm.show[tab] = !vm.show[tab];
        }
    }
});

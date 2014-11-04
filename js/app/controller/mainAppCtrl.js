(function() {
    
    "use strict";

    angular
        .module('mainApp')
        .controller('mainAppCtrl', mainAppCtrl);

    mainAppCtrl.$inject = [
        'notificationFactory',
        '$stateParams'
    ];
    
    function mainAppCtrl( notificationFactory, $stateParams) {

        var mctrl = this;
        mctrl.tournaments_id = (typeof $stateParams.tournaments_id != 'undefined') ? $stateParams.tournaments_id: "";
        mctrl.show           = {};
        mctrl.toggleTab      = toggleTab;
        
        function toggleTab (tab) {
            mctrl.show[tab] = !mctrl.show[tab];
        }
    }
})();
(function() {
    "use strict";

    angular.module('mainApp').controller('mainAppCtrl', mainAppCtrl);

        
    mainAppCtrl.$inject = [
        'notificationFactory'
    ];
    
    function mainAppCtrl( notificationFactory) {
        var mctrl = this;
        
        mctrl.show = {};
        mctrl.toggleTab = function (tab) {
            mctrl.show[tab] = !mctrl.show[tab];
        };
    }
})();
(function() {
    "use strict";

    angular.module('mainApp').controller('mainAppCtrl', mainAppCtrl);

    function mainAppCtrl() {
        
        var mctrl = this;
        
        mctrl.show = {};
        mctrl.toggleTab = function (tab) {
            mctrl.show[tab] = !mctrl.show[tab];
        };
    }
})();
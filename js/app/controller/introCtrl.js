(function(){
    
    "use strict";
    
    angular
        .module("mainApp")
        .controller("introCtrl", introCtrl);
        
    introCtrl.$inject = [
        'appResource',
        'notificationFactory',
        'messageFactory'
    ];
    
    function introCtrl ( appResource, notificationFactory, messageFactory ) {
        
        var ictrl = this;
        ictrl.tournaments = [];
        
        activate();

        function activate () {
            appResource.intro.getAll().$promise.then(function(data) {
                ictrl.tournaments = data;
                //notificationFactory.trigger('userData',[uctrl.users.userData]);
            });
        }
        
    }
    
})();
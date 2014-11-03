(function(){
    
    "use strict";
    
    angular
        .module('mainApp')
        .controller('introCtrl', introCtrl);
        
    introCtrl.$inject = [
        '$state',
        'appResource',
        'notificationFactory',
        'messageFactory'
    ];

    function introCtrl ( $state, appResource, notificationFactory, messageFactory) {
        
        var ictrl              = this;
        ictrl.tournaments      = [];
        ictrl.selectTournament = selectTournament;
        ictrl.selectTournamentId = "";
        
        activate();
        
        function activate () {
            
            appResource.intro.getAll().$promise.then(function(data) {
                ictrl.tournaments = data;
            });
            
        }
        
        function selectTournament (form) {
            console.log("selectTournament: "+ictrl.selectTournamentId.id);
        }
    }
})();

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
        
        var ictrl                = this;
        ictrl.tournaments        = [];
        ictrl.name               = "";
        ictrl.selectTournamentId = "";
        ictrl.selectTournament   = selectTournament;
        ictrl.add                = add;
        
        activate();
        
        function activate () {
            
            appResource.intro.getAll().$promise.then(function(data) {
                ictrl.tournaments = data;
            });
            
        }
        function add () {
            appResource.intro.set({"name" : ictrl.name}).$promise.then(function(data) {
                ictrl.tournaments.push(data);
            });
        }
        function selectTournament (form) {
            $state.transitionTo('game', {tournaments_id:ictrl.selectTournamentId.id});
        }
    }
})();

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
        ictrl.del                = del;
        
        activate();
        
        function activate () {
            
            appResource.intro.getAll().$promise.then(function(data) {
                ictrl.tournaments = data;
            });
            
        }
        function add () {
            if(ictrl.tournaments.filter(function(obj){if(obj.name == ictrl.name ){ return obj;}}).length){
                messageFactory.set_error("tournaments_exist");
                messageFactory.set_alert('error');
            }else{
                appResource.intro.set({"name" : ictrl.name}).$promise.then(function(data) {
                    ictrl.tournaments.push(data);
                    ictrl.name = "";
                });    
            }
        }
        function del() {
            if(typeof ictrl.selectTournamentId.id != 'undefined'){
                if(messageFactory.get_confirm("tournaments_delete")){
                    appResource.intro.del({"id":ictrl.selectTournamentId.id}).$promise.then(function(data) {
                        ictrl.tournaments = ictrl.tournaments.filter(function(obj){if(obj.id != ictrl.selectTournamentId.id ){ return obj;}})
                    });
                }
            }
        }
        function selectTournament (form) {
            if(typeof ictrl.selectTournamentId.id != 'undefined')
            $state.transitionTo('game', {tournaments_id:ictrl.selectTournamentId.id});
        }
    }
})();

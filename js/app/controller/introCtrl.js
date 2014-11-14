define(
    [
        'app'
    ],
    function (app) {
    
    "use strict";
    
    app.controller('introCtrl', introCtrl);
        
    introCtrl.$inject = [
        '$state',
        'appResource',
        'notificationFactory',
        'messageFactory'
    ];

    function introCtrl ( $state, appResource, notificationFactory, messageFactory) {
        
        var vm                = this;
        vm.tournaments        = [];
        vm.name               = "";
        vm.selectTournamentId = "";
        vm.selectTournament   = selectTournament;
        vm.add                = add;
        vm.del                = del;
        
        activate();
        
        function activate () {
            
            appResource.intro.getAll().$promise.then(function(data) {
                vm.tournaments = data;
            });
            
        }
        function add () {
            if(vm.tournaments.filter(function(obj){if(obj.name == vm.name ){ return obj;}}).length){
                messageFactory.set_error("tournaments_exist");
                messageFactory.set_alert('error');
            }else{
                appResource.intro.set({"name" : vm.name}).$promise.then(function(data) {
                    vm.tournaments.push(data);
                    vm.name = "";
                });    
            }
        }
        function del() {
            if(typeof vm.selectTournamentId != 'undefined' && typeof vm.selectTournamentId.id != 'undefined'){
                if(messageFactory.get_confirm("tournaments_delete")){
                    appResource.intro.del({"id":vm.selectTournamentId.id}).$promise.then(function(data) {
                        vm.tournaments = vm.tournaments.filter(function(obj){if(obj.id != vm.selectTournamentId.id ){ return obj;}})
                    });
                }
            }
        }
        function selectTournament (form) {
            if(typeof vm.selectTournamentId != 'undefined' && typeof vm.selectTournamentId.id != 'undefined')
            $state.transitionTo('game', {tournaments_id:vm.selectTournamentId.id});
        }
    }
});

define(
    [
        'app',
        'factory/teamFactory'
    ],
    function (app) {
    
    "use strict";

    app.controller('teamCtrl', teamCtrl);

    teamCtrl.$inject = [
        'teamFactory',
        'notificationFactory',
        'messageFactory',
        'appResource',
        '$stateParams'
    ];

    function teamCtrl( teamFactory, notificationFactory, messageFactory, appResource, $stateParams) {
        
        var vm            = this;
        vm.teams          = teamFactory.get();
        vm.addTeam        = addTeam;
        vm.deleteTeam     = deleteTeam;
        vm.tournaments_id = $stateParams.tournaments_id;

        activate();

        function activate () {
            
            appResource.team.getAll({"tournaments_id" : vm.tournaments_id}).$promise.then(function(data) {
                vm.teams.teamData = data;
                notificationFactory.trigger('teamData',[vm.teams.teamData]);
            });
            
            notificationFactory.on('userData',function(data){
                vm.teams.userData = data;
            });
            notificationFactory.on('deleteUser',function(data){
                vm.teams.userData = data;
            });
            notificationFactory.on('actualGameData',function(data){
                vm.teams.actualGameData = data;
            });
            
        }
        function addTeam(form) {
            
            var actionOk = true;
            
            if ( ! form.teamForm.$valid) {
                messageFactory.set_error("fields_need_content");
                actionOk = false;
            }
            if(vm.teams.teamData.filter(function(obj){if(obj.teamname == vm.teams.team.teamname ){ return obj;}}).length){
                messageFactory.set_error("teamname_exist");
                actionOk = false;
            }
            if( ! actionOk){
                vm.teams.formmsg = messageFactory.get_error();
            }else{
                var newteam = {
                    teamname       : vm.teams.team.teamname,
                    player_1       : vm.teams.team.player_1.id,
                    player_2       : vm.teams.team.player_2.id,
                    tournaments_id : vm.tournaments_id
                };
                appResource.team.set(angular.copy(newteam)).$promise.then(function(data) {
                    data.nickname_1 = vm.teams.team.player_1.nickname;
                    data.nickname_2 = vm.teams.team.player_2.nickname;
                    vm.teams.teamData.push(angular.copy(data));
                    vm.teams.team = {teamname: '', player_1: '', player_2: ''};
                    notificationFactory.trigger('teamData',[vm.teams.teamData]);
                });
            }
        }
        function deleteTeam(id) {
            var teamDelt = vm.teams.teamData.filter(function(obj){if(obj.id == id ){ return obj;}})[0];
            if(vm.teams.actualGameData.team_1 == teamDelt.teamname || vm.teams.actualGameData.team_2 == teamDelt.teamname ){
                messageFactory.set_error("team_is_in_active_game");
                messageFactory.set_alert('error');
            }else{
                if(messageFactory.get_confirm("team_delete")){
                    appResource.team.del({"id":id}).$promise.then(function(data) {
                        vm.teams.teamData = vm.teams.teamData.filter(function(obj){if(obj.id != id ){ return obj;}})
                        notificationFactory.trigger('deleteTeamData',[vm.teams.teamData]);
                    });
                }
            }
        }
    }
});
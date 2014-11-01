(function() {
    "use strict";

    angular.module('mainApp').controller('teamCtrl', teamCtrl);

    teamCtrl.$inject = [
        'teamFactory',
        'notificationFactory',
        'messageFactory',
        'appResource'
    ];

    function teamCtrl( teamFactory, notificationFactory, messageFactory, appResource) {
        
        var tmctrl        = this;
        tmctrl.teams      = teamFactory.get();
        tmctrl.addTeam    = addTeam;
        tmctrl.deleteTeam = deleteTeam;

        activate();

        function activate () {
            
            appResource.team.getAll().$promise.then(function(data) {
                tmctrl.teams.teamData = data;
                notificationFactory.trigger('teamData',[tmctrl.teams.teamData]);
            });
            
            notificationFactory.on('userData',function(data){
                tmctrl.teams.userData = data;
            });
            notificationFactory.on('deleteUser',function(data){
                tmctrl.teams.userData = data;
            });
            notificationFactory.on('actualGameData',function(data){
                tmctrl.teams.actualGameData = data;
            });
            
        }
        function addTeam(form) {
            
            var actionOk = true;
            
            if ( ! form.teamForm.$valid) {
                messageFactory.set_error("fields_need_content");
                actionOk = false;
            }
            if(tmctrl.teams.teamData.filter(function(obj){if(obj.teamname == tmctrl.teams.team.teamname ){ return obj;}}).length){
                messageFactory.set_error("teamname_exist");
                actionOk = false;
            }
            if( ! actionOk){
                tmctrl.teams.formmsg = messageFactory.get_error();
            }else{
                var newteam = {
                    teamname: tmctrl.teams.team.teamname,
                    player_1: tmctrl.teams.team.player_1.id,
                    player_2: tmctrl.teams.team.player_2.id
                };
                appResource.team.set(angular.copy(newteam)).$promise.then(function(data) {
                    data.nickname_1 = tmctrl.teams.team.player_1.nickname;
                    data.nickname_2 = tmctrl.teams.team.player_2.nickname;
                    tmctrl.teams.teamData.push(angular.copy(data));
                    tmctrl.teams.team = {teamname: '', player_1: '', player_2: ''};
                    notificationFactory.trigger('teamData',[tmctrl.teams.teamData]);
                });
            }
        }
        function deleteTeam(id) {
            
            var teamDelt = tmctrl.teams.teamData.filter(function(obj){if(obj.id == id ){ return obj;}})[0];
            if(tmctrl.teams.actualGameData.team_1 == teamDelt.teamname || tmctrl.teams.actualGameData.team_2 == teamDelt.teamname ){
                messageFactory.set_error("team_is_in_active_game");
                messageFactory.set_alert('error');
            }else{
                if(messageFactory.get_confirm("team_delete")){
                    appResource.team.del({"id":id}).$promise.then(function(data) {
                        tmctrl.teams.teamData = tmctrl.teams.teamData.filter(function(obj){if(obj.id != id ){ return obj;}})
                        notificationFactory.trigger('deleteTeamData',[tmctrl.teams.teamData]);
                    });
                }
            }
        }
    }
})();
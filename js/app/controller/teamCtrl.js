(function() {
    
    "use strict";

    angular
        .module('mainApp')
        .controller('teamCtrl', teamCtrl);

    teamCtrl.$inject = [
        'teamFactory',
        'notificationFactory',
        'messageFactory',
        'appResource'
    ];

    function teamCtrl( teamFactory, notificationFactory, messageFactory, appResource) {
        
        var tctrl = this;
        
        tctrl.teams      = teamFactory.get();
        tctrl.addTeam    = addTeam;
        tctrl.deleteTeam = deleteTeam;

        activate();
        
        function activate () {
        
            appResource.team.getAll().$promise.then(function(data) {
                tctrl.teams.teamData = data;
                notificationFactory.trigger('teamData',[tctrl.teams.teamData]);
            });
            notificationFactory.on('userData',function(data){
                tctrl.teams.userData = data;
            });
            notificationFactory.on('deleteUser',function(data){
                tctrl.teams.userData = data;
            });
            notificationFactory.on('actualGameData',function(data){
                tctrl.teams.actualGameData = data;
            });  
        }

        
        function addTeam(form) {
            
            var actionOk = true;
            
            if ( ! form.teamForm.$valid) {
                messageFactory.set_error("fields_need_content");
                actionOk = false;
            }
            if(tctrl.teams.teamData.filter(function(obj){if(obj.teamname == tctrl.teams.team.teamname ){ return obj;}}).length){
                messageFactory.set_error("teamname_exist");
                actionOk = false;
            }
            if( ! actionOk){
                tctrl.teams.formmsg = messageFactory.get_error();
            }else{
                var newteam = {
                    teamname: tctrl.teams.team.teamname,
                    player_1: tctrl.teams.team.player_1.id,
                    player_2: tctrl.teams.team.player_2.id
                };
                appResource.team.set(angular.copy(newteam)).$promise.then(function(data) {
                    data.nickname_1 = tctrl.teams.team.player_1.nickname;
                    data.nickname_2 = tctrl.teams.team.player_2.nickname;
                    tctrl.teams.teamData.push(angular.copy(data));
                    tctrl.teams.team = {teamname: '', player_1: '', player_2: ''};
                    notificationFactory.trigger('teamData',[tctrl.teams.teamData]);
                });
            }
        }
        function deleteTeam(id) {
            
            var teamDelt = tctrl.teams.teamData.filter(function(obj){if(obj.id == id ){ return obj;}})[0];
            
            if(tctrl.teams.actualGameData.team_1 == teamDelt.teamname || tctrl.teams.actualGameData.team_2 == teamDelt.teamname ){
                messageFactory.set_error("team_is_in_active_game");
                messageFactory.set_alert('error');
            }else{
                if(messageFactory.get_confirm("team_delete")){
                    appResource.team.del({"id":id}).$promise.then(function(data) {
                        tctrl.teams.teamData = tctrl.teams.teamData.filter(function(obj){if(obj.id != id ){ return obj;}})
                        notificationFactory.trigger('deleteTeamData',[tctrl.teams.teamData]);
                    });
                }
            }
        }
    }
})();
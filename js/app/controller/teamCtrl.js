(function() {
    "use strict";

    angular.module('mainApp').controller('teamCtrl', teamCtrl);

    teamCtrl.$inject = [
        '$scope',
        'teamFactory',
        'notificationFactory',
        'messageFactory',
        'appResource'
    ];

    function teamCtrl( $scope, teamFactory, notificationFactory, messageFactory, appResource) {
        // scope teams
        $scope.teams = teamFactory.get();
        // add team
        $scope.addTeam = addTeam;
        // delete tesm
        $scope.deleteTeam = deleteTeam;
        
        appResource.team.getAll().$promise.then(function(data) {
            $scope.teams.teamData = data;
            notificationFactory.trigger('teamData',[$scope.teams.teamData]);
        });
        
        notificationFactory.on('userData',function(data){
            $scope.teams.userData = data;
        });
        notificationFactory.on('deleteUser',function(data){
            $scope.teams.userData = data;
        });
        notificationFactory.on('actualGameData',function(data){
            $scope.teams.actualGameData = data;
        });
        // func
        function addTeam() {
            var actionOk = true;
            if ( ! $scope.teamForm.$valid) {
                messageFactory.set_error("fields_need_content");
                actionOk = false;
            }
            if($scope.teams.teamData.filter(function(obj){if(obj.teamname == $scope.teams.team.teamname ){ return obj;}}).length){
                messageFactory.set_error("teamname_exist");
                actionOk = false;
            }
            if( ! actionOk){
                $scope.teams.formmsg = messageFactory.get_error();
            }else{
                var newteam = {
                    teamname: $scope.teams.team.teamname,
                    player_1: $scope.teams.team.player_1.id,
                    player_2: $scope.teams.team.player_2.id
                };
                appResource.team.set(angular.copy(newteam)).$promise.then(function(data) {
                    data.nickname_1 = $scope.teams.team.player_1.nickname;
                    data.nickname_2 = $scope.teams.team.player_2.nickname;
                    $scope.teams.teamData.push(angular.copy(data));
                    $scope.teams.team = {teamname: '', player_1: '', player_2: ''};
                    notificationFactory.trigger('teamData',[$scope.teams.teamData]);
                });
            }
        }
        function deleteTeam(id) {
            var teamDelt = $scope.teams.teamData.filter(function(obj){if(obj.id == id ){ return obj;}})[0];
            if($scope.teams.actualGameData.team_1 == teamDelt.teamname || $scope.teams.actualGameData.team_2 == teamDelt.teamname ){
                messageFactory.set_error("team_is_in_active_game");
                messageFactory.set_alert('error');
            }else{
                if(messageFactory.get_confirm("team_delete")){
                    appResource.team.del({"id":id}).$promise.then(function(data) {
                        $scope.teams.teamData = $scope.teams.teamData.filter(function(obj){if(obj.id != id ){ return obj;}})
                        notificationFactory.trigger('deleteTeamData',[$scope.teams.teamData]);
                    });
                }
            }
        }
        
    }
})();
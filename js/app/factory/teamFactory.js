(function() {
    "use strict";

    angular.module('mainApp').factory('teamFactory', teamFactory);

    teamFactory.$inject = [
        'notificationFactory',
        'messageFactory'
    ];
    
    function teamFactory (notificationFactory, messageFactory) {
        var init = 0;
        var teams = {
            team : {
                player_1 : null,
                player_2 : null,
                teamname : "",
                id       : null
            },
            teamData : [
                {teamname: 'Ateam', player_1: 'SChrobak', player_2: 'MChrobak', id: 1},
                {teamname: 'Vollenergie', player_1: 'PaulM', player_2: 'PaulaM', id: 2}
            ],
            teamColumnsDef : [
                {field: 'teamname', displayName: 'Team-Name'},
                {field: 'player_1', displayName: 'Spieler 1'},
                {field: 'player_2', displayName: 'Spieler 2'},
                {
                    displayName  : 'Aktion',
                    cellTemplate : 'templates/grid-options-team-template.html'
                }
            ],
            userData       : [],
            actualGameData : {},
            headertitle    : 'Teams',
            formmsg        : 'Neues Team speichern',
            teamAutoId     : null
        }
        var returns = {
            addTeam       : addTeam,
            deleteTeam    : deleteTeam,
            get           : get
        }
        /* notifications listener */
        notificationFactory.on('init',function(){
            if(!init){
                notificationFactory.trigger('teamData',[teams.teamData]);
                init=1;
                console.log("team init");
            }
        });
        notificationFactory.on('userData',function(){
            teams.userData = arguments[0];
        });
        notificationFactory.on('deleteUser',function(){
            teams.userData = arguments[0];
        });
        notificationFactory.on('actualGameData',function(){
            teams.actualGameData = arguments[0];
        });
        
        /**
        * public function addTeam
        *
        * @description valided teamform and if ok run add func
        * @returns void
        */
         function addTeam(form) {
            var actionOk = true;
            if ( ! form.teamForm.$valid) {
                messageFactory.set_error("fields_need_content");
                actionOk = false;
            }
            if(teams.teamData.filter(function(obj){if(obj.teamname == teams.team.teamname ){ return obj;}}).length){
                messageFactory.set_error("teamname_exist");
                actionOk = false;
            }
            if( ! actionOk){
                teams.formmsg = messageFactory.get_error();
            }else{
                var newteam = {
                    teamname: teams.team.teamname,
                    player_1: teams.team.player_1.nickname,
                    player_2: teams.team.player_2.nickname,
                    id: teams.teamAutoId()
                };
                teams.teamData.push(angular.copy(newteam));
                teams.team = {teamname: '', player_1: '', player_2: '', id: 0};
                notificationFactory.trigger('teamData',[teams.teamData]);
            }
        }
        /**
        * public function deleteTeam
        *
        * @description valided team not playing and if confirm delete
        * @returns void
        */
        function deleteTeam(id, scope) {
            var teamDelt = teams.teamData.filter(function(obj){if(obj.id == id ){ return obj;}})[0];
            if(teams.actualGameData.team_1 == teamDelt.teamname || teams.actualGameData.team_2 == teamDelt.teamname ){
                messageFactory.set_error("team_is_in_active_game");
                messageFactory.set_alert('error');
            }else{
                if(messageFactory.get_confirm("team_delete")){
                    teams.teamData = teams.teamData.filter(function(obj){if(obj.id != id ){ return obj;}});
                    notificationFactory.trigger('deleteTeamData',[teams.teamData]);
                }
            }
        }
        /**
        * public function get
        *
        * @returns object
        */
        function get () { return teams; }
        
        return returns;
    }    
})();

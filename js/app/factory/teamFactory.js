(function() {
    "use strict";

    angular.module('mainApp').factory('TeamFactory', TeamFactory);

    TeamFactory.$inject = [
        'MessageFactory'
    ];
    
    function TeamFactory (MessageFactory) {
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
                    displayName: 'Aktion',
                    cellTemplate: 'templates/grid-options-team-template.html'
                }
            ],
            headertitle : 'Control Team',
            formmsg : '',
            teamAutoId : null,
            getTeamnames : getTeamnames,
            getIdByTeamname : getIdByTeamname
        }
        /**
        * private teamnameExist
        *
        * @description check teamname exist
        * @returns integer
        */
        function teamnameExist(){
            if(teams.teamData.length){
                return teams.teamData.filter(function(obj){if(obj.teamname == teams.team.teamname ){ return obj;}}).length;
            }
            return 0;
        }
        /**
        * public teamPlays
        *
        * @description check team is playing
        * @returns integer
        */
        function teamPlays(teamid, scope) {
            if(scope.games.gameIsRunning){
                return teams.teamData.filter(function(obj){if(obj.teamname==scope.games.gameActualTeamData.team_1 || obj.teamname==scope.games.gameActualTeamData.team_2 ){ return obj;}}).length;
            }
            return 0;
        }
        /**
        * protect getTeamnames
        *
        * @description get teamnames
        * @returns array
        */
        function getTeamnames() {
            var r = [];
            for(var e in teams.teamData){ r.push(teams.teamData[e].teamname); }
            return r;
        }
        /**
        * protect getIdByTeamname
        *
        * @description get teamid by teamname
        * @returns number
        */
        function getIdByTeamname(teamname) {
            var r = null;
            for(var e in teams.teamData){
                if(teams.teamData[e].teamname==teamname){
                    r=teams.teamData[e].id;
                    break;
                }
            }
            return r;
        }
        /**
        * private addTeamData
        *
        * @description set new team
        * @returns void
        */
        function addTeamData() {
            var newteam = {
                teamname: teams.team.teamname,
                player_1: teams.team.player_1.nickname,
                player_2: teams.team.player_2.nickname,
                id: teams.teamAutoId()
            };
            teams.teamData.push(angular.copy(newteam));
            teams.team = {teamname: '', player_1: '', player_2: '', id: 0};
        }
        /**
        * public addTeam
        *
        * @description valided teamform and if ok run add func
        * @returns void
        */
         function addTeam(scope) {
            var actionOk = true;
            if ( ! scope.teamForm.$valid) {
                MessageFactory.set_error("fields_need_content");
                actionOk = false;
            }
            if(teamnameExist()){
                MessageFactory.set_error("teamname_exist");
                actionOk = false;
            }
            if( ! actionOk){
                scope.formmsg.team = MessageFactory.get_error();
            }else{
                addTeamData();
            }
        }
        /**
        * public deleteTeam
        *
        * @description valided team not playing and if confirm delete
        * @returns void
        */
        function deleteTeam(id, scope) {
            if(teamPlays(id, scope)){
                MessageFactory.set_error("team_is_in_active_game");
                MessageFactory.set_alert('error');
            }else{
                if(MessageFactory.get_confirm("team_delete")){
                    teams.teamData = teams.teamData.filter(function(obj){if(obj.id != id ){ return obj;}});
                }
            }
        }
        /**
        * public get
        *
        * @returns object
        */
        function get () {
            return teams;
        }
        return {
            addTeam       : addTeam,
            deleteTeam    : deleteTeam,
            get           : get
        }
    }    
})();

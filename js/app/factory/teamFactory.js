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
                teamname : ""
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
            teamAutoId : null,
            getTeamnames : getTeamnames,
            getIdByTeamname : getIdByTeamname
        }
        /**
        * private get_checkTeamnameUnique
        *
        * @returns boolean if teamname not unique than false
        */
        function checkTeamnameUnique(){
            var r = true;
            if(teams.teamData.length){
                if(teams.teamData.filter(function(obj){if(obj.teamname == teams.team.teamname ){ return obj;}}).length){
                    r = false;
                }
            }
            return r;
        }
        /**
        * public checkTeamIsInActiveGame
        *
        * @description check if team is playing
        * @returns boolean
        */
        function checkTeamIsInActiveGame(teamid, scope) {
            var isin = false;
            if(scope.games.gameIsRunning){
                if(teams.teamData.filter(function(obj){if(obj.teamname==scope.games.gameActualTeamData.team_1 || obj.teamname == scope.games.gameActualTeamData.team_2 ){ return obj;}}).length){
                    isin = true;
                }
            }
            return isin;
        }
        /**
        * protect getTeamnames
        *
        * @description get teamnames
        * @returns array
        */
        function getTeamnames() {
            var r = [];
            for(var e in teams.teamData){
                r.push(teams.teamData[e].teamname);
            }
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
        * @returns boolean if form not valid than false
        */
         function addTeam(scope) {
            var actionOk = true;
            if ( ! scope.teamForm.$valid) {
                MessageFactory.set_error("fields_need_content");
                return false;
            }
            if( ! checkTeamnameUnique()){
                MessageFactory.set_error("teamname_exist");
                actionOk = false;
            }

            if(actionOk){
                addTeamData();
            }
            
            if( ! actionOk)
            scope.tpl.formmsg.team = MessageFactory.get_error();
        }
        /**
        * public deleteTeam
        *
        * @description valided team not in a active game and if ok delete
        * @returns boolean if team in a active game than false
        */
        function deleteTeam(id, scope) {
            var res = [];
            var actionOk = false;
            if(checkTeamIsInActiveGame(id, scope)){
                MessageFactory.set_error("team_is_in_active_game");
            }else{
                res = teams.teamData.filter(function(obj){if(obj.id != id ){ return obj;}})
                actionOk = true;
            }
            if(actionOk && MessageFactory.get_confirm("team_delete")){
                teams.teamData = res;
            }

            if( ! actionOk)
            MessageFactory.set_alert('error');
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
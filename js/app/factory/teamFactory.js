(function() {
    "use strict";

    angular.module('mainApp').factory('TeamFactory', TeamFactory);

    TeamFactory.$inject = [
        'notificationFactory',
        'MessageFactory'
    ];
    
    function TeamFactory (notificationFactory, MessageFactory) {
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
        * public addTeam
        *
        * @description valided teamform and if ok run add func
        * @returns void
        */
         function addTeam(form) {
            var actionOk = true;
            if ( ! form.teamForm.$valid) {
                MessageFactory.set_error("fields_need_content");
                actionOk = false;
            }
            if(teams.teamData.filter(function(obj){if(obj.teamname == teams.team.teamname ){ return obj;}}).length){
                MessageFactory.set_error("teamname_exist");
                actionOk = false;
            }
            if( ! actionOk){
                teams.formmsg = MessageFactory.get_error();
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
        * public deleteTeam
        *
        * @description valided team not playing and if confirm delete
        * @returns void
        */
        function deleteTeam(id, scope) {
            console.log(teams.actualGameData)
            var teamDelt = teams.teamData.filter(function(obj){if(obj.id == id ){ return obj;}})[0];
            if(teams.actualGameData.team_1 == teamDelt.teamname || teams.actualGameData.team_2 == teamDelt.teamname ){
                MessageFactory.set_error("team_is_in_active_game");
                MessageFactory.set_alert('error');
            }else{
                if(MessageFactory.get_confirm("team_delete")){
                    teams.teamData = teams.teamData.filter(function(obj){if(obj.id != id ){ return obj;}});
                    notificationFactory.trigger('teamData',[teams.teamData]);
                }
            }
        }
        /**
        * public get
        *
        * @returns object
        */
        function get () { return teams; }
        
        return returns;
    }    
})();

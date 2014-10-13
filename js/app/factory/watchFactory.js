(function() {
    "use strict";

    angular.module('mainApp').factory('WatchFactory', WatchFactory);

    function WatchFactory () {
        /**
        * public set
        *
        * @returns void
        */
        function set (scope, callbacks) {
            scope.$watch('games.gameData',
                function(){
                    callbacks.setGameScoreData();
                },
                true
            );
            scope.$watch('teams.teamData',
                function(){
                    callbacks.setGameDataHasTeamCeck();
                },
                true
            );
            scope.$watch('teams.team.player_1',
                function(){
                    if(scope.teams.team.player_1 && scope.teams.team.player_2){
                        if(scope.teams.team.player_1.nickname === scope.teams.team.player_2.nickname)
                        scope.teams.team.player_2 = null
                    }
                },
                true
            );
            scope.$watch('teams.team.player_2',
                function(){
                    if(scope.teams.team.player_1 && scope.teams.team.player_2){
                        if(scope.teams.team.player_1.nickname === scope.teams.team.player_2.nickname)
                        scope.teams.team.player_2 = null
                    }
                },
                true
            );
            scope.$watch('games.game.team_1',
                function(){
                    if(scope.games.game.team_1 && scope.games.game.team_2){
                        if(scope.games.game.team_1.teamname === scope.games.game.team_2.teamname)
                        scope.games.game.team_2 = null
                    }
                },
                true
            );
            scope.$watch('games.game.team_2',
                function(){
                    if(scope.games.game.team_1 && scope.games.game.team_2){
                        if(scope.games.game.team_1.teamname === scope.games.game.team_2.teamname)
                        scope.games.game.team_2 = null
                    }
                },
                true
            );
        }
        return {
            set : set
        }
    }    
})();
(function() {
    "use strict";

    angular.module('mainApp').factory('GameFactory', GameFactory);

    GameFactory.$inject = [
        'MessageFactory'
    ];
    
    function GameFactory (MessageFactory) {
        var games = {
            game : {
                team_1 : null,
                team_2 : null
            },
            gameData : [
                {team_win: 'Ateam',team_1: 'Ateam', team_2: 'Vollenergie', result: '7 : 1', id: 1},
                {team_win: 'Vollenergie',team_1: 'Ateam', team_2: 'Vollenergie', result: '3 : 7', id: 2}
            ],
            gameScoreData : [],
            gameColumnsDef : [
                {field: 'team_1', displayName: 'Team 1'},
                {field: 'team_2', displayName: 'Team 2'},
                {field: 'result', displayName: 'Ergebnis'},
                {
                    displayName  : 'Aktion',
                    cellTemplate : 'templates/grid-options-game-template.html'
                }
            ],
            scoreColumnsDef : [
                {field: 'teamname', displayName: 'Teamname'},
                {field: 'gamecounts', displayName: 'Anzahl Spiele'},
                {field: 'totalpoints', displayName: 'Punkte'}
            ],
            goalsItemConf : [
                {val:'1'},
                {val:'2'},
                {val:'3'},
                {val:'4'},
                {val:'5'},
                {val:'6'},
                {val:'7'}
            ],
            gameActualTeamData : {
                team_1        : 'Kein Team',
                team_2        : 'Kein Team',
                team_1_scores : 0,
                team_2_scores : 0
            },
            gameAutoId : null,
            gameIsRunning         : false,
            activeDirectiveId     : '',
            setGameActualTeamData : setGameActualTeamData,
            addGame               : addGame
        }
        /**
        * protect setGameActualTeamData
        *
        * @description set default scope GameActualTeamData
        * @returns void
        */
        function setGameActualTeamData(){
            games.gameActualTeamData = {
                team_1        : ((typeof games.game.team_1 == 'object') ? games.game.team_1.teamname :'Kein Team'),
                team_2        : ((typeof games.game.team_2 == 'object') ? games.game.team_2.teamname :'Kein Team'),
                team_1_scores : 0,
                team_2_scores : 0
            };
        }
        /**
        * protect addGame
        *
        * @description
        * @returns void
        */
        function addGame() {
            var arg = {
                team_win : (games.gameActualTeamData.team_1_scores>games.gameActualTeamData.team_2_scores)? games.gameActualTeamData.team_1:games.gameActualTeamData.team_2,
                team_1   : games.gameActualTeamData.team_1,
                team_2   : games.gameActualTeamData.team_2,
                result   : games.gameActualTeamData.team_1_scores+' : '+games.gameActualTeamData.team_2_scores,
                id       : games.gameAutoId()
            }
            games.gameData.push(arg);
            games.setGameActualTeamData();
        }
        /**
        * public deleteGame
        *
        * @description
        * @returns void
        */
        function deleteGame(id) {
            games.gameData = games.gameData.filter(function(obj){if(obj.id != id){return obj}});
        }
        /**
        * public get
        *
        * @returns object
        */
        function get () {
            return games;
        }
        return {
            get        : get,
            deleteGame : deleteGame
        }
    }    
})();
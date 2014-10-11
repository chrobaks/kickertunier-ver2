(function() {
    "use strict";

    angular.module('mainApp').factory('GameStorageFactory', GameStorageFactory);

    GameStorageFactory.$inject = [
        'MessageFactory'
    ];
    
    function GameStorageFactory (MessageFactory) {
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
                    displayName: 'Aktion',
                    cellTemplate: 'templates/grid-options-game-template.html'
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
                team_1: 'Kein Team',
                team_2: 'Kein Team',
                team_1_scores: 0,
                team_2_scores: 0
            },
            gameAutoId : null,
            gameIsRunning : false,
            activeDirectiveId : ''
        }
        /**
        * public get
        *
        * @returns object
        */
        function get () {
            return games;
        }
        /**
        * public deleteGame
        *
        * @description
        * @returns boolean
        */
        var deleteGame = function (id) {
            games.gameData = games.gameData.filter(function(obj){if(obj.id != id){return obj}});
        }
        return {
            deleteGame            : deleteGame,
            get                   : get
        }
    }    
})();
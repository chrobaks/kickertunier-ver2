(function() {
    "use strict";

    angular.module('mainApp').controller('gameCtrl', GameCtrl);

    GameCtrl.$inject = [
        '$scope',
        'AutoIdFactory',
        'GameFactory',
        'GameActionFactory'
    ];

    function GameCtrl( $scope, AutoIdFactory, GameFactory, GameActionFactory) {
        // SCOPE VAR games
        $scope.games = GameFactory.get();
        $scope.games.gameAutoId = AutoIdFactory.getFuncautoId($scope.games.gameData);
        $scope.gridOptionsGame = {
            data: 'games.gameData',
            columnDefs: 'games.gameColumnsDef'
        };
        $scope.gridOptionsGameScore = {
            data: 'games.gameScoreData',
            columnDefs: 'games.scoreColumnsDef',
            sortInfo: { fields: ['totalpoints'], directions: ['desc']}
        };

        // START GAME
        $scope.startGame = startGame;
        // DELETE GAME
        $scope.deleteGame = deleteGame;
        // SET GOAL
        $scope.setGoal = setGoal;

        // INIT Game SCOPE
        init();
        //FUNCTIONS
        function init() {
            GameActionFactory.init($scope);
        }
        function startGame() {
            GameActionFactory.setStartGame();
        }
        function setGoal(obj, $event) {
            GameActionFactory.setGoal($event.target,obj);
        }
        function deleteGame(id) {
            GameFactory.deleteGame(id);
        }
    }
})();

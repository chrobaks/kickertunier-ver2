(function() {
    "use strict";

    angular.module('mainApp').controller('gameCtrl', GameCtrl);

    GameCtrl.$inject = [
        '$scope',
        'AutoIdFactory',
        'GameFactory'
    ];

    function GameCtrl( $scope, AutoIdFactory, GameFactory) {
        // SCOPE VAR games
        $scope.games = GameFactory.get();
        $scope.games.gameAutoId = AutoIdFactory.getFuncautoId($scope.games.gameData);
        $scope.gridOptionsGame = {
            data: 'games.gameData',
            columnDefs: 'games.gameColumnsDef'
        };
        $scope.gridOptionsGameScore = {
            data: 'games.scoreData',
            columnDefs: 'games.scoreColumnsDef',
            sortInfo: { fields: ['totalpoints'], directions: ['desc']}
        };

        // START GAME
        $scope.startGame = startGame;
        // DELETE GAME
        $scope.deleteGame = deleteGame;

        // INIT Game SCOPE
        //init();
        //FUNCTIONS
        function init() {
            
        }
        function startGame() {
            GameFactory.startGame($scope.gameForm);
        }
        function deleteGame(id) {
            GameFactory.deleteGame(id);
        }
    }
})();

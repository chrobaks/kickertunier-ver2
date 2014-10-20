(function() {
    "use strict";

    angular.module('mainApp').controller('gameCtrl', gameCtrl);

    gameCtrl.$inject = [
        '$scope',
        'autoidFactory',
        'gameFactory'
    ];

    function gameCtrl( $scope, autoidFactory, gameFactory) {
        // scope games
        $scope.games = gameFactory.get();
        // scope games userAutoId
        $scope.games.gameAutoId = autoidFactory.getFuncautoId($scope.games.gameData);
        // scope gridOptions game
        $scope.gridOptionsGame = {
            data: 'games.gameData',
            columnDefs: 'games.gameColumnsDef'
        };
        // scope gridOptions score
        $scope.gridOptionsGameScore = {
            data: 'games.scoreData',
            columnDefs: 'games.scoreColumnsDef',
            sortInfo: { fields: ['totalpoints'], directions: ['desc']}
        };
        // start game
        $scope.startGame = startGame;
        // delete game
        $scope.deleteGame = deleteGame;
        //func
        function startGame() {
            gameFactory.startGame($scope.gameForm);
        }
        function deleteGame(id) {
            gameFactory.deleteGame(id);
        }
    }
})();

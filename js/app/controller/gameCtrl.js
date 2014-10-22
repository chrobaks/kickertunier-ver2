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

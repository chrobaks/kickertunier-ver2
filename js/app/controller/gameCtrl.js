(function() {
    "use strict";

    angular.module('mainApp').controller('gameCtrl', gameCtrl);

    gameCtrl.$inject = [
        '$scope',
        'gameFactory',
        'notificationFactory',
        'messageFactory',
        'appResource'
    ];

    function gameCtrl( $scope, gameFactory, notificationFactory, messageFactory, appResource) {
        // scope games
        $scope.games = gameFactory.get();
        // start game
        $scope.startGame = startGame;
        // delete game
        $scope.deleteGame = deleteGame;

        appResource.game.getAll().$promise.then(function(data) {
            $scope.games.gameData = data;
            notificationFactory.trigger('actualGameData',[$scope.games.actualGameData]);
            notificationFactory.trigger('gameIsRunning',[$scope.games.gameIsRunning]);
        });

        appResource.scorelist.getAll().$promise.then(function(data) {
            $scope.games.scoreData = data;
        });

        notificationFactory.trigger('actualGameData',[$scope.games.actualGameData]);
        notificationFactory.trigger('gameIsRunning',[$scope.games.gameIsRunning]);
        notificationFactory.on('teamData',function(data){
            $scope.games.teamData = data;
        });
        notificationFactory.on('deleteTeamData',function(data){
            $scope.games.teamData = data;
            gameFactory.updateGameData();
        });
        notificationFactory.on('scoreConfig',function(data){
            gameFactory.setGoal(data);
        });
        //func
        function startGame() {
            gameFactory.startGame($scope.gameForm);
        }
        function deleteGame(id) {
            gameFactory.deleteGame(id);
        }
    }
})();

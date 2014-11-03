(function() {
    "use strict";

    angular.module('mainApp').controller('gameCtrl', gameCtrl);

    gameCtrl.$inject = [
        'gameFactory',
        'notificationFactory',
        'messageFactory',
        'appResource'
    ];

    function gameCtrl( gameFactory, notificationFactory, messageFactory, appResource) {

        var gmctrl        = this;
        gmctrl.startGame  = startGame;
        gmctrl.deleteGame = deleteGame;

        activate();

        function activate () {

            gmctrl.games = gameFactory.get();

            appResource.game.getAll().$promise.then(function(data) {
                gmctrl.games.gameData = data;
                notificationFactory.trigger('actualGameData',[gmctrl.games.actualGameData]);
                notificationFactory.trigger('gameIsRunning',[gmctrl.games.gameIsRunning]);
            });

            appResource.scorelist.getAll().$promise.then(function(data) {
                gmctrl.games.scoreData = data;
            });

            notificationFactory.on('teamData',function(data){
                gmctrl.games.teamData = data;
            });
            notificationFactory.on('deleteTeamData',function(data){
                gmctrl.games.teamData = data;
                gameFactory.updateGameData();
            });
            notificationFactory.on('scoreConfig',function(data){
                gameFactory.setGoal(data);
            });

        }
        
        function startGame(form) {
            gameFactory.startGame(form.gameForm);
        }
        function deleteGame(id) {
            gameFactory.deleteGame(id);
        }
    }
})();

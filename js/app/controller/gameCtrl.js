(function() {
    
    "use strict";

    angular
        .module('mainApp')
        .controller('gameCtrl', gameCtrl);

    gameCtrl.$inject = [
        'gameFactory',
        'notificationFactory',
        'messageFactory',
        'appResource'
    ];

    function gameCtrl( gameFactory, notificationFactory, messageFactory, appResource) {
        
        var gctrl = this;

        gctrl.startGame = startGame;
        gctrl.deleteGame = deleteGame;

        activate();

        function activate () {

            gctrl.games = gameFactory.get();

            appResource.game.getAll().$promise.then(function(data) {
                gctrl.games.gameData = data;
                notificationFactory.trigger('actualGameData',[gctrl.games.actualGameData]);
                notificationFactory.trigger('gameIsRunning',[gctrl.games.gameIsRunning]);
            });

            appResource.scorelist.getAll().$promise.then(function(data) {
                gctrl.games.scoreData = data;
            });

            notificationFactory.on('teamData',function(data){
                gctrl.games.teamData = data;
            });
            notificationFactory.on('deleteTeamData',function(data){
                gctrl.games.teamData = data;
                gameFactory.updateGameData();
            });
            notificationFactory.on('scoreConfig',function(data){
                gameFactory.setGoal(data);
            });

        }
        
        function startGame(form) {
            gameFactory.startGame(form);
        }
        function deleteGame(id) {
            gameFactory.deleteGame(id);
        }
    }
})();

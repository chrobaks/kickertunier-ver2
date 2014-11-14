define(
    [
        'app',
        'directive/scoreDisplayDirective',
        'factory/gameFactory'
    ],
    function (app) {
    
    "use strict";

    app.controller('gameCtrl', gameCtrl);

    gameCtrl.$inject = [
        'gameFactory',
        'notificationFactory',
        'messageFactory',
        'appResource',
        '$stateParams'
    ];

    function gameCtrl( gameFactory, notificationFactory, messageFactory, appResource, $stateParams) {

        var vm        = this;
        vm.startGame  = startGame;
        vm.deleteGame = deleteGame;

        activate();

        function activate () {

            vm.games = gameFactory.get();
            vm.games.tournaments_id = $stateParams.tournaments_id;

            appResource.game.getAll({"tournaments_id" : vm.games.tournaments_id}).$promise.then(function(data) {
                vm.games.gameData = data;
                notificationFactory.trigger('actualGameData',[vm.games.actualGameData]);
                notificationFactory.trigger('gameIsRunning',[vm.games.gameIsRunning]);
            });

            appResource.scorelist.getAll({"tournaments_id" : vm.games.tournaments_id}).$promise.then(function(data) {
                vm.games.scoreData = data;
            });

            notificationFactory.on('teamData',function(data){
                vm.games.teamData = data;
            });
            notificationFactory.on('deleteTeamData',function(data){
                vm.games.teamData = data;
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
});

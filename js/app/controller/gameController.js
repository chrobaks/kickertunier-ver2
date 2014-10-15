(function() {
    "use strict";

    angular.module('mainApp').controller('gameCtrl', GameCtrl);

    GameCtrl.$inject = [
        '$rootScope',
        '$scope',
        'TplFactory',
        'UserFactory',
        'TeamFactory',
        'GameFactory',
        'GameActionFactory'
    ];

    function GameCtrl($rootScope, $scope, TplFactory, UserFactory, TeamFactory, GameFactory, GameActionFactory) {
        // SCOPE VAR tpl
        $scope.tpl = TplFactory.get();
        // SCOPE VAR users
        $scope.users = UserFactory.get();
        // SCOPE VAR teams
        $scope.teams = TeamFactory.get();
        // SCOPE VAR games
        $scope.games = GameFactory.get();
        // ADD USER
        $scope.addUser = addUser;
        // ADD TEAM
        $scope.addTeam = addTeam;
        // ADD USER
        $scope.deleteUser = deleteUser;
        // DELETE TEAM
        $scope.deleteTeam = deleteTeam;
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
        function addUser() {
            UserFactory.addUser($scope);
        }
        function deleteUser(id) {
            UserFactory.deleteUser(id, $scope);
        }
        function addTeam() {
            TeamFactory.addTeam($scope);
        }
        function deleteTeam(id) {
            TeamFactory.deleteTeam(id, $scope);
        }
        function deleteGame(id) {
            GameFactory.deleteGame(id);
        }
    }
})();

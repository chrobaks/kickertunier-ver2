(function() {
    "use strict";

    angular.module('mainApp').controller('gameCtrl', GameCtrl);

    GameCtrl.$inject = [
        '$scope',
        'TplFactory',
        'UserFactory',
        'TeamFactory',
        'GameStorageFactory',
        'GameFactory'
    ];

    function GameCtrl($scope, TplFactory, UserFactory, TeamFactory, GameStorageFactory, GameFactory) {
        // SCOPE VAR tpl
        $scope.tpl = TplFactory.get();
        // SCOPE VAR users
        $scope.users = UserFactory.get();
        // SCOPE VAR teams
        $scope.teams = TeamFactory.get();
        // SCOPE VAR games
        $scope.games = GameStorageFactory.get();
        // ADD USER
        $scope.addUser = addUser;
        // ADD TEAM
        $scope.addTeam = addTeam;
        // ADD USER
        $scope.deleteUser = deleteUser;
        // ADD TEAM
        $scope.deleteTeam = deleteTeam;
        // START GAME
        $scope.startGame = startGame;
        // DELETE GAME DATA
        $scope.deleteGame = deleteGame;
        // SET GOAL
        $scope.setGoal = setGoal;
        // SHOW TAB WRAPER
        $scope.showTabWrapper = showTabWrapper;
        // INIT Game SCOPE
        init();
        //FUNCTIONS
        function init() {
            GameFactory.set_initialze($scope);
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
            GameStorageFactory.deleteGame(id);
        }
        function startGame() {
            GameFactory.set_startGame();
        }
        function setGoal(obj, $event) {
            GameFactory.set_gameActualTeamData($event.target,obj);
        }
        function showTabWrapper($event){
            TplFactory.showTabWrapper($event);
        }
    }
})()
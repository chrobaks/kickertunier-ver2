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
        var testid = 1;
        $scope.$on('$viewContentLoaded',function(event){
            console.log("Contents load."+testid);
            testid+=1;
        });
        // INIT Game SCOPE
        init();
        //FUNCTIONS
        function init() {
            GameFactory.setInitialze($scope);
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
            GameFactory.setStartGame();
        }
        function setGoal(obj, $event) {
            GameFactory.setGameActualTeamData($event.target,obj);
        }
        function showTabWrapper($event){
            TplFactory.showTabWrapper($event);
        }
    }
})()
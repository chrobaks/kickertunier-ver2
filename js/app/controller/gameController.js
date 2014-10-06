(function() {
    "use strict";

    angular.module('mainApp').controller('gameController', GameController);

    GameController.$inject = [
        '$scope',
        'GameFactory',
        'MessageFactory'
    ];

    function GameController($scope, GameFactory, MessageFactory) {
        
        // SCOPE VAR headertitle  show controller header titel
        $scope.headertitle = {
            user: "Control Spieler",
            team: "Control Team",
            game: "Control Game"
        }
        // SCOPE VAR formmsg show formular messages
        $scope.formmsg = {
            user: "Neuen Spieler speichern",
            team: "Neues Team speichern",
            game: "Neues Spiel starten"
        }
        // SCOPE VAR wrapperstatus
        $scope.wrapperstatus = {
            user: 0,
            team: 0,
            game: 1
        }
        // SCOPE VAR selectData stores all select data
        $scope.selectData = {
            user: [],
            team: []
        }
        // SCOPE VAR gamescoredata stores games score list
        $scope.gameScoreData = [];
        // SCOPE VAR scoreColumnsDef stores Columns Definition
        $scope.scoreColumnsDef = [
            {field: 'teamname', displayName: 'Teamname'},
            {field: 'gamecounts', displayName: 'Anzahl Spiele'},
            {field: 'totalpoints', displayName: 'Punkte'}
        ];
        // SCOPE VAR gamedata stores all games
        $scope.gameData = [
            {team_win: 'Ateam',team_1: 'Ateam', team_2: 'Vollenergie', result: '7 : 1', id: 1},
            {team_win: 'Vollenergie',team_1: 'Ateam', team_2: 'Vollenergie', result: '3 : 7', id: 2}
        ];
        // SCOPE VAR gameColumnsDef stores Columns Definition
        $scope.gameColumnsDef = [
            {field: 'team_1', displayName: 'Team 1'},
            {field: 'team_2', displayName: 'Team 2'},
            {field: 'result', displayName: 'Ergebnis'},
            {
                displayName: 'Aktion',
                cellTemplate: 'templates/grid-options-game-template.html'
            }
        ];
        // SCOPE VAR teamdata stores all teams
        $scope.teamData = [
            {teamname: 'Ateam', player_1: 'SChrobak', player_2: 'MChrobak', id: 1},
            {teamname: 'Vollenergie', player_1: 'PaulM', player_2: 'PaulaM', id: 2}
        ];
        // SCOPE VAR teamColumnsDef stores Columns Definition
        $scope.teamColumnsDef = [
            {field: 'teamname', displayName: 'Team-Name'},
            {field: 'player_1', displayName: 'Spieler 1'},
            {field: 'player_2', displayName: 'Spieler 2'},
            {
                displayName: 'Aktion',
                cellTemplate: 'templates/grid-options-team-template.html'
            }
        ];
        // SCOPE VAR userdata stores all user
        $scope.userData = [
            {nickname: 'SChrobak', firstname: 'Stefan', secondname: 'Chrobak', id: 1},
            {nickname: 'MChrobak', firstname: 'Max', secondname: 'Chrobak', id: 2},
            {nickname: 'PaulM', firstname: 'Paul', secondname: 'Mustermann', id: 3},
            {nickname: 'PaulaM', firstname: 'Paula', secondname: 'Musterfrau', id: 4}
        ];
        // SCOPE VAR userColumnsDef stores Columns Definition
        $scope.userColumnsDef = [
            {field: 'nickname', displayName: 'Nick-Name'},
            {field: 'firstname', displayName: 'Vorname'},
            {field: 'secondname', displayName: 'Nachname'},
            {displayName: 'Aktion', cellTemplate: 'templates/grid-options-user-template.html'}
        ];
        // SCOPE VAR gameactualteamdata store activ game
        $scope.gameActualTeamData = {};
        // SCOPE VAR gameisrunning stores game status
        $scope.gameIsRunning = false;
        // SCOPE VAR activeDirectiveId
        // contains activ scoreDisplay index
        $scope.activeDirectiveId = '';
        // SCOPE VAR goalsconf stores goal item
        // array.length is max goals pro game
        $scope.goalsItemConf = [
            {val:'1'},
            {val:'2'},
            {val:'3'},
            {val:'4'},
            {val:'5'},
            {val:'6'},
            {val:'7'}
        ];
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
            GameFactory.set_addUser();
        }
        function deleteUser(id) {
            GameFactory.set_deleteUser(id);
        }
        function addTeam() {
            GameFactory.set_addTeam();
        }
        function deleteTeam(id) {
            GameFactory.set_deleteTeam(id);
        }
        function startGame() {
            GameFactory.set_startGame();
        }
        function deleteGame(id) {
            GameFactory.set_deleteGame(id);
        }
        function setGoal(obj, $event) {
            GameFactory.set_gameActualTeamData($event.target,obj);
        }
        function showTabWrapper($event){
            GameFactory.set_showTabWrapper($event);
        }
    }
})()
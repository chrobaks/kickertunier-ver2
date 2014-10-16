(function() {
    "use strict";

    angular.module('mainApp').factory('GridFactory', GridFactory);

    function GridFactory () {
        /**
        * public setGridOptions
        *
        * @description
        * @returns void
        */
        function setGridOptonsUser (scope) {
            scope.gridOptionsUser = {
                data: 'users.userData',
                columnDefs: 'users.userColumnsDef'
            };
        }
        function setGridOptonsTeam (scope) {
            scope.gridOptionsTeam = {
                data: 'teams.teamData',
                columnDefs: 'teams.teamColumnsDef'
            };
        }
        function setGridOptonsGame (scope) {
            scope.gridOptionsGame = {
                data: 'games.gameData',
                columnDefs: 'games.gameColumnsDef'
            };
            scope.gridOptionsGameScore = {
                data: 'games.gameScoreData',
                columnDefs: 'games.scoreColumnsDef',
                sortInfo: { fields: ['totalpoints'], directions: ['desc']}
            };
        }
        return {
            setGridOptonsUser : setGridOptonsUser,
            setGridOptonsTeam : setGridOptonsTeam,
            setGridOptonsGame : setGridOptonsGame
        }
    }    
})();

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
        function setGridOptons (scope) {
            scope.gridOptionsUser = {
                data: 'users.userData',
                columnDefs: 'users.userColumnsDef'
            };
            scope.gridOptionsTeam = {
                data: 'teams.teamData',
                columnDefs: 'teams.teamColumnsDef'
            };
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
            setGridOptons : setGridOptons
        }
    }    
})();

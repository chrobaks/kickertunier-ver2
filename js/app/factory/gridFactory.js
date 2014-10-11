(function() {
    "use strict";

    angular.module('mainApp').factory('GridFactory', GridFactory);

    function GridFactory () {
        /**
        * public setGridOptions
        *
        * @description get back next autoid for each scope list data
        * @returns integer
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
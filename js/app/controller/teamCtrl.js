(function() {
    "use strict";

    angular.module('mainApp').controller('teamCtrl', TeamCtrl);

    TeamCtrl.$inject = [
        '$scope',
        'TeamFactory',
        'AutoIdFactory'
    ];

    function TeamCtrl( $scope, TeamFactory, AutoIdFactory) {

        // SCOPE VAR teams
        $scope.teams = TeamFactory.get();
        $scope.teams.teamAutoId = AutoIdFactory.getFuncautoId($scope.teams.teamData);
        $scope.gridOptionsTeam = {
            data: 'teams.teamData',
            columnDefs: 'teams.teamColumnsDef'
        };

        // ADD TEAM
        $scope.addTeam = addTeam;
        // DELETE TEAM
        $scope.deleteTeam = deleteTeam;

        function addTeam() {
            TeamFactory.addTeam($scope);
        }
        function deleteTeam(id) {
            TeamFactory.deleteTeam(id, $scope);
        }
    }
})();
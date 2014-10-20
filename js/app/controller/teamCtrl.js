(function() {
    "use strict";

    angular.module('mainApp').controller('teamCtrl', teamCtrl);

    teamCtrl.$inject = [
        '$scope',
        'teamFactory',
        'autoidFactory'
    ];

    function teamCtrl( $scope, teamFactory, autoidFactory) {
        // scope teams
        $scope.teams = teamFactory.get();
        // scope teams teamAutoId
        $scope.teams.teamAutoId = autoidFactory.getFuncautoId($scope.teams.teamData);
        // scope gridOptions
        $scope.gridOptionsTeam = {
            data: 'teams.teamData',
            columnDefs: 'teams.teamColumnsDef'
        };
        // add team
        $scope.addTeam = addTeam;
        // delete tesm
        $scope.deleteTeam = deleteTeam;
        // func
        function addTeam() {
            teamFactory.addTeam($scope.teamForm);
        }
        function deleteTeam(id) {
            teamFactory.deleteTeam(id);
        }
        
    }
})();
(function() {
    "use strict";

    angular.module('mainApp').controller('teamCtrl', TeamCtrl);

    TeamCtrl.$inject = [
        '$scope',
        'TeamFactory',
        'AutoIdFactory'
    ];

    function TeamCtrl( $scope, TeamFactory, AutoIdFactory) {
        // scope teams
        $scope.teams = TeamFactory.get();
        // scope teams teamAutoId
        $scope.teams.teamAutoId = AutoIdFactory.getFuncautoId($scope.teams.teamData);
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
            TeamFactory.addTeam($scope.teamForm);
        }
        function deleteTeam(id) {
            TeamFactory.deleteTeam(id);
        }
        
    }
})();
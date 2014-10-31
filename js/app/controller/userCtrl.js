(function() {
    "use strict";

    angular.module('mainApp').controller('userCtrl', userCtrl);

    userCtrl.$inject = [
        '$scope',
        'userFactory',
        'appResource',
        'notificationFactory',
        'messageFactory'
    ];

    function userCtrl ( $scope, userFactory, appResource, notificationFactory, messageFactory) {
        $scope.users = userFactory.get();
        // add user
        $scope.addUser = addUser;
        // delete user
        $scope.deleteUser = deleteUser;

        appResource.user.getAll().$promise.then(function(data) {
            $scope.users.userData = data;
            notificationFactory.trigger('userData',[$scope.users.userData]);
        });

        notificationFactory.on('teamData',function(data){
            $scope.users.teamData = data;
        });
        notificationFactory.on('deleteTeamData',function(data){
            $scope.users.teamData = data;
        });

        // func
        function addUser() {
            var actionOk = true;
            if ( ! $scope.userForm.$valid) {
                messageFactory.set_error("fields_need_content");
                actionOk = false;
            }
            if($scope.users.userData.filter(function(obj){if(obj.nickname==$scope.users.user.nickname ){ return obj;}}).length){
                messageFactory.set_error("nickname_exist");
                actionOk = false;
            }
            if(actionOk){
                appResource.user.set(angular.copy($scope.users.user)).$promise.then(function(data) {
                    $scope.users.userData.push(data);
                    $scope.users.user = {nickname: '', firstname: '', secondname: ''};
                    notificationFactory.trigger('userData',[$scope.users.userData]);
                });
            }else{
                $scope.users.formmsg = messageFactory.get_error();
            }
        }
        function deleteUser(id) {
            if($scope.users.teamData.filter(function(obj){if(obj.player_1==id || obj.player_2 == id ){ return obj;}}).length){
                messageFactory.set_error("player_is_in_team");
                messageFactory.set_alert('error');
            }else{
                appResource.user.del({"id":id}).$promise.then(function(data) {
                    $scope.users.userData = $scope.users.userData.filter(function(obj){if(obj.id != id ){ return obj;}})
                    notificationFactory.trigger('deleteUser',[$scope.users.userData]);
                });
            }
        }
    }
})();

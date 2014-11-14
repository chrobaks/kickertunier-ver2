define(
    [
        'app',
        'factory/userFactory'
    ],
    function (app) {
    
    "use strict";

    app.controller('userCtrl', userCtrl);

    userCtrl.$inject = [
        'userFactory',
        'appResource',
        'notificationFactory',
        'messageFactory',
        '$stateParams'
    ];

    function userCtrl ( userFactory, appResource, notificationFactory, messageFactory, $stateParams) {

        var vm = this;
        
        vm.addUser        = addUser;
        vm.deleteUser     = deleteUser;
        vm.tournaments_id = $stateParams.tournaments_id;

        activate();

        function activate () {
            vm.users = userFactory.get();

            appResource.user.getAll({"tournaments_id" : vm.tournaments_id}).$promise.then(function(data) {
                vm.users.userData = data;
                notificationFactory.trigger('userData',[vm.users.userData]);
            });

            notificationFactory.on('teamData',function(data){
                vm.users.teamData = data;
            });
            notificationFactory.on('deleteTeamData',function(data){
                vm.users.teamData = data;
            });
        }

        function addUser(form) {
            var actionOk = true;
            if ( ! form.userForm.$valid) {
                messageFactory.set_error("fields_need_content");
                actionOk = false;
            }
            if(vm.users.userData.filter(function(obj){if(obj.nickname==vm.users.user.nickname ){ return obj;}}).length){
                messageFactory.set_error("nickname_exist");
                actionOk = false;
            }
            if(actionOk){
                vm.users.user.tournaments_id = vm.tournaments_id;
                appResource.user.set(angular.copy(vm.users.user)).$promise.then(function(data) {
                    vm.users.userData.push(data);
                    vm.users.user = {nickname: '', firstname: '', secondname: ''};
                    notificationFactory.trigger('userData',[vm.users.userData]);
                });
            }else{
                vm.users.formmsg = messageFactory.get_error();
            }
        }
        function deleteUser(id) {
            if(vm.users.teamData.filter(function(obj){if(obj.player_1==id || obj.player_2 == id ){ return obj;}}).length){
                messageFactory.set_error("player_is_in_team");
                messageFactory.set_alert('error');
            }else{
                appResource.user.del({"id":id}).$promise.then(function(data) {
                    vm.users.userData = vm.users.userData.filter(function(obj){if(obj.id != id ){ return obj;}})
                    notificationFactory.trigger('deleteUser',[vm.users.userData]);
                });
            }
        }
    }
});

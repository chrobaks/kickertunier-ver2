(function() {
    
    "use strict";

    angular
        .module('mainApp')
        .controller('userCtrl', userCtrl);

    userCtrl.$inject = [
        'userFactory',
        'appResource',
        'notificationFactory',
        'messageFactory'
    ];

    function userCtrl ( userFactory, appResource, notificationFactory, messageFactory) {

        var uctrl = this;
        
        uctrl.addUser    = addUser;
        uctrl.deleteUser = deleteUser;

        activate();

        function activate () {
            
            uctrl.users = userFactory.get();

            appResource.user.getAll().$promise.then(function(data) {
                uctrl.users.userData = data;
                notificationFactory.trigger('userData',[uctrl.users.userData]);
            });

            notificationFactory.on('teamData',function(data){
                uctrl.users.teamData = data;
            });
            notificationFactory.on('deleteTeamData',function(data){
                uctrl.users.teamData = data;
            });
        }

        function addUser(form) {
            
            var actionOk = true;
            
            if ( ! form.userForm.$valid) {
                messageFactory.set_error("fields_need_content");
                actionOk = false;
            }
            if(uctrl.users.userData.filter(function(obj){if(obj.nickname==uctrl.users.user.nickname ){ return obj;}}).length){
                messageFactory.set_error("nickname_exist");
                actionOk = false;
            }
            if(actionOk){
                appResource.user.set(angular.copy(uctrl.users.user)).$promise.then(function(data) {
                    uctrl.users.userData.push(data);
                    uctrl.users.user = {nickname: '', firstname: '', secondname: ''};
                    notificationFactory.trigger('userData',[uctrl.users.userData]);
                });
            }else{
                uctrl.users.formmsg = messageFactory.get_error();
            }
        }
        function deleteUser(id) {
            if(uctrl.users.teamData.filter(function(obj){if(obj.player_1==id || obj.player_2 == id ){ return obj;}}).length){
                messageFactory.set_error("player_is_in_team");
                messageFactory.set_alert('error');
            }else{
                appResource.user.del({"id":id}).$promise.then(function(data) {
                    uctrl.users.userData = uctrl.users.userData.filter(function(obj){if(obj.id != id ){ return obj;}})
                    notificationFactory.trigger('deleteUser',[uctrl.users.userData]);
                });
            }
        }
    }
})();

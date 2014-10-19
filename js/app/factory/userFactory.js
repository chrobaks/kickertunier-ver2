(function() {
    "use strict";

    angular.module('mainApp').factory('userFactory', userFactory);
    
    userFactory.$inject = [
        'notificationFactory',
        'MessageFactory'
    ];
    
    function userFactory (notificationFactory, MessageFactory) {
        var init = 0;
        var users = {
            user : {
                firstname  : "",
                secondname : "",
                nickname   : "",
                id         : null
            },
            userData : [
                {nickname: 'SChrobak', firstname: 'Stefan', secondname: 'Chrobak', id: 1},
                {nickname: 'MChrobak', firstname: 'Max', secondname: 'Chrobak', id: 2},
                {nickname: 'PaulM', firstname: 'Paul', secondname: 'Mustermann', id: 3},
                {nickname: 'PaulaM', firstname: 'Paula', secondname: 'Musterfrau', id: 4}
            ],
            userColumnsDef : [
                {field: 'nickname', displayName: 'Nick-Name'},
                {field: 'firstname', displayName: 'Vorname'},
                {field: 'secondname', displayName: 'Nachname'},
                {displayName: 'Aktion', cellTemplate: 'templates/grid-options-user-template.html'}
            ],
            teamData    : [],
            headertitle : 'Spieler',
            formmsg     : 'Neuen Spieler speichern',
            userAutoId  : null
        };
        var returns = {
            addUser    : addUser,
            deleteUser : deleteUser,
            get        : get
        };
        notificationFactory.on('init',function(){
            if(!init){
                notificationFactory.trigger('userData',[users.userData]);
                init=1;
                console.log("user init");
            }
        });
        notificationFactory.on('teamData',function(){
            users.teamData = arguments[0];
        });
        
        /**
        * public function addUser
        *
        * @description valided userform and if ok run add func
        * @returns void
        */
        function addUser(form) {
            var actionOk = true;
            if ( ! form.$valid) {
                MessageFactory.set_error("fields_need_content");
                actionOk = false;
            }
            if(users.userData.filter(function(obj){if(obj.nickname==users.user.nickname ){ return obj;}}).length){
                MessageFactory.set_error("nickname_exist");
                actionOk = false;
            }
            if(actionOk){
                users.user.id = users.userAutoId();
                users.userData.push(angular.copy(users.user));
                users.user = {nickname: '', firstname: '', secondname: '', id: 0};
            }else{
                users.formmsg = MessageFactory.get_error();
            }
        }
        /**
        * public function set_deleteUser
        *
        * @returns void
        */
        function deleteUser(id) {
            var ncknm = users.userData.filter(function(obj){if(obj.id == id ){ return obj;}})[0].nickname;
            if(users.teamData.filter(function(obj){if(obj.player_1==ncknm || obj.player_2 == ncknm ){ return obj;}}).length){
                MessageFactory.set_error("player_is_in_team");
                MessageFactory.set_alert('error');
            }else{
                users.userData = users.userData.filter(function(obj){if(obj.id != id ){ return obj;}})
                notificationFactory.trigger('deleteUser',[users.userData]);
            }
        }
        /**
        * public function get
        *
        * @returns object
        */
        function get () { return users; }
        return returns;
    }    
})();

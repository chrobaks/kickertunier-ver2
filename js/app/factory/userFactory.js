(function() {
    "use strict";

    angular.module('mainApp').factory('UserFactory', UserFactory);
    
    UserFactory.$inject = [
        'MessageFactory'
    ];
    
    function UserFactory (MessageFactory) {
        var users = {
            user : {
                firstname : "",
                secondname : "",
                nickname : ""
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
            userAutoId : null
        }
        /**
        * private get_checkNicknameUnique
        *
        * @returns boolean if nickname not unique than false
        */
        function checkNicknameUnique(){
            var isUnique = true;
            if(users.userData.length){
                if(users.userData.filter(function(obj){if(obj.nickname==users.user.nickname ){ return obj;}}).length){
                    isUnique = false;
                }
            }
            return isUnique;
        }
        /**
        * private get_checkUserIsInTeam
        *
        * @description check if team contains user by userid
        * @returns boolean
        */
        function checkUserIsInTeam(id,scope) {
            var isin = false;
            var ncknm = users.userData.filter(function(obj){if(obj.id == id ){ return obj;}})[0].nickname;
            if(scope.teams.teamData.length){
                if(scope.teams.teamData.filter(function(obj){if(obj.player_1==ncknm || obj.player_2 == ncknm ){ return obj;}}).length){
                    isin = true;
                }
            }
            return isin;
        }
        /**
        * public get
        *
        * @returns object
        */
        function get () {
            return users;
        }
        /**
        * private set_addUserData
        *
        * @description set new user
        * @returns void
        */
        function addUserData() {
            users.user.id = users.userAutoId();
            users.userData.push(angular.copy(users.user));
            users.user = {nickname: '', firstname: '', secondname: '', id: 0};
        }
        /**
        * public addUser
        *
        * @description valided userform and if ok run add func
        * @returns boolean if form not valid than false
        */
        function addUser(scope) {
            var actionOk = true;
            if ( ! scope.userForm.$valid) {
                MessageFactory.set_error("fields_need_content");
                actionOk = false;
            }
            if( ! checkNicknameUnique()){
                MessageFactory.set_error("nickname_exist");
                actionOk = false;
            }
            if(actionOk){
                addUserData();
            }else{
                scope.tpl.formmsg.user = MessageFactory.get_error();
            }
        }
        /**
        * public set_deleteGame
        *
        * @description
        * @returns boolean
        */
        /**
        * public set_deleteUser
        *
        * @description valided user not in a team and if ok delete
        * @returns void
        */
        function deleteUser(id, scope) {
            if( checkUserIsInTeam(id, scope) ){
                MessageFactory.set_error("player_is_in_team");
                MessageFactory.set_alert('error');
            }else{
                users.userData = users.userData.filter(function(obj){if(obj.id != id ){ return obj;}})
            }
        }
        return {
            addUser       : addUser,
            deleteUser    : deleteUser,
            get           : get
        }
    }    
})();
/*
*
* MAIN APPLICATION FACTORYS
*
* # MessageFactory
**/
(function() {
    
    "use strict";
    
    angular.module('mainAppFactory', [])
    .factory('MessageFactory', MessageFactory);
    
    function MessageFactory() {
        var config_confirm = {
            "game_has_winner" : "Hurra! Das Team [%a1%] hat gewonnen, soll das Spiel eingetragen werden?",
            "team_delete" : "Wenn Sie das Team löschen, werden alle Spiele, an denen das Team beteiligt war, ebenfalls gelöscht! Möchten Sie das Team wirklich löschen?"
        }
        var config_error = {
            "fields_need_content" : "Alle Felder benötigen einen Eintrag!",
            "nickname_exist" : "Der Nickname existiert schon.",
            "teamname_exist" : "Der Teamname existiert schon.",
            "team_need_two_player": "Ein Team benötigt zwei Spieler.",
            "game_need_two_teams": "Ein Spiel benötigt zwei Teams.",
            "player_is_in_team": "Der Spieler ist Mitglied in einem Team und kann nicht gelöscht werden.",
            "team_is_in_active_game": "Das Team befindet sich in einem aktivem Spiel und kann nicht gelöscht werden!"
        }
        var message = {
            error: [],
            info: []
        }
        /**
        * public get_confirm
        *
        * @returns boolean
        */
        var get_confirm = function (key) {
            if(config_confirm.hasOwnProperty(key)){
                var txt = (arguments.length<2) ? config_confirm[key] : config_confirm[key].replace("[%a1%]",arguments[1]);
                return  confirm(txt);
            }else{
                return false;
            }
        }
        /**
        * public get_error
        *
        * @returns string
        */
        var get_error = function () {
            var sep = (arguments.length) ? arguments[0] : '';
            var r = message.error.join(sep);
            message.error = [];
            return r;
        }
        /**
        * public get_info
        *
        * @returns string
        */
        var get_info = function () {
            var sep = (arguments.length) ? arguments[0] : '';
            var r = message.info.join(sep);
            message.info = [];
            return r;
        }
        /**
        * public set_alert
        *
        * @returns void
        */
        var set_alert = function (msgid) {
           alert(((msgid==='error') ? get_error() : get_info()));
        }
        /**
        * public set_error
        *
        * @returns void
        */
        var set_error = function (key) {
            if(config_error.hasOwnProperty(key)){
               message.error.push(config_error[key]);
            }
        }
        /**
        * public set_info
        *
        * @returns void
        */
        var set_info = function (str) {
           message.info.push(str);
        }
    
        return {
            get_confirm: get_confirm,
            get_info: get_info,
            get_error: get_error,
            set_alert: set_alert,
            set_error: set_error,
            set_info: set_info
            
        };
    }
})()
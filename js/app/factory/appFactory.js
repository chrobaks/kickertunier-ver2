(function() {
    
    "use strict";
    
    angular
        .module('mainAppFactory', [])
        .factory('messageFactory', messageFactory);
    
    function messageFactory() {
        
        var config_confirm = {
            "game_has_winner"    : "Hurra! Das Team [%a1%] hat gewonnen, soll das Spiel eingetragen werden?",
            "team_delete"        : "Wenn du das Team löscht, dann werden alle Spiele, an denen das Team beteiligt war, ebenfalls gelöscht! Möchtest du das Team wirklich löschen?",
            "tournaments_delete" : "Wenn du das Tunier löscht, dann werden alle Spiele, Teams und Spieler ebenfalls gelöscht! Möchten Sie das Team wirklich löschen?"
        };
        var config_error = {
            "fields_need_content"    : "Alle Felder benötigen einen Eintrag!",
            "tournaments_exist"      : "Der Tuniername existiert schon.",
            "nickname_exist"         : "Der Nickname existiert schon.",
            "teamname_exist"         : "Der Teamname existiert schon.",
            "team_need_two_player"   : "Ein Team benötigt zwei Spieler.",
            "game_need_two_teams"    : "Ein Spiel benötigt zwei Teams.",
            "player_is_in_team"      : "Der Spieler ist Mitglied in einem Team und kann nicht gelöscht werden.",
            "team_is_in_active_game" : "Das Team befindet sich in einem aktivem Spiel und kann nicht gelöscht werden!"
        };
        var message = {
            error : [],
            info  : []
        };
        var returns = {
            get_confirm : getConfirm,
            get_info    : getInfo,
            get_error   : getError,
            set_alert   : setAlert,
            set_error   : setError,
            set_info    : setInfo
        };
        
        function getConfirm (key) {
            if(config_confirm.hasOwnProperty(key)){
                var txt = (arguments.length<2) ? config_confirm[key] : config_confirm[key].replace("[%a1%]",arguments[1]);
                return  confirm(txt);
            }else{
                return false;
            }
        }
        function getError () {
            var sep = (arguments.length) ? arguments[0] : '';
            var r = message.error.join(sep);
            message.error = [];
            return r;
        }
        function getInfo () {
            var sep = (arguments.length) ? arguments[0] : '';
            var r = message.info.join(sep);
            message.info = [];
            return r;
        }
        function setAlert (msgid) {
           alert(((msgid==='error') ? get_error() : get_info()));
        }
        function setError (key) {
            if(config_error.hasOwnProperty(key)){
               message.error.push(config_error[key]);
            }
        }
        function setInfo (str) {
           message.info.push(str);
        }
    
        return returns;
    }
})();


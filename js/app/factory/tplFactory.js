(function() {
    "use strict";

    angular.module('mainApp').factory('TplFactory', TplFactory);

    function TplFactory () {
        
        var config = {
            headertitle: {
                user: "Control Spieler",
                team: "Control Team",
                game: "Control Game"
            },
            formmsg : {
                user: "Neuen Spieler speichern",
                team: "Neues Team speichern",
                game: "Neues Spiel starten"
            },
            wrapperstatus : {
                user: 0,
                team: 0,
                game: 1
            }
        }
        function get(){
            return config;
        }
        /**
        * public showTabWrapper
        *
        * @description set click event box-label
        * @returns void
        */
        function showTabWrapper($event){
            var id = angular.element("body div.box-label").index($event.target);
            var boxid = angular.element($event.target).attr("data-boxid");
            var wrapper = angular.element("body div.wrapper-box:eq("+id+")");
            var show = (wrapper.hasClass('active')) ? wrapper.removeClass('active'):wrapper.addClass('active');
            config.wrapperstatus[boxid] = (wrapper.hasClass('active')) ? 1:0;
        }
        return {
            get              : get,
            showTabWrapper   : showTabWrapper
        }
    }    
})();
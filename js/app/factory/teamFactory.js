(function() {
    "use strict";

    angular.module('mainApp').factory('teamFactory', teamFactory);
    
    function teamFactory () {
        var teams = {
            team : {
                player_1 : null,
                player_2 : null,
                teamname : ""
            },
            teamData : [],
            userData       : [],
            actualGameData : {},
            headertitle    : 'Teams',
            formmsg        : 'Neues Team speichern'
        }
        var returns = {
            get : get
        }
        /**
        * public function get
        *
        * @returns object
        */
        function get () { return teams; }
        
        return returns;
    }    
})();

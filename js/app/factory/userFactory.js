(function() {
    "use strict";

    angular.module('mainApp').factory('userFactory', userFactory);
    
    function userFactory () {
        var users = {
            user : {
                firstname  : "",
                secondname : "",
                nickname   : ""
            },
            userData    : [],
            teamData    : [],
            headertitle : 'Spieler',
            formmsg     : 'Neuen Spieler speichern',
            userAutoId  : null
        };
        /**
        * public function get
        *
        * @returns object
        */
        function get () { return users; }

        return {
            get : get
        };
    }    
})();

define(
    [
        'app'
    ],
    function (app) {
        
    "use strict";

    app.factory('userFactory', userFactory);
    
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
        
        function get () { return users; }

        return {
            get : get
        };
    }    
});

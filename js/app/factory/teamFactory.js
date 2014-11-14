define(
    [
        'app'
    ],
    function (app) {
        
    "use strict";

    app.factory('teamFactory', teamFactory);
    
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
        
        function get () { return teams; }
        
        return returns;
    }    
});

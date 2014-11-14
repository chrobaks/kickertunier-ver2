define([
    'app'
], function (app) {
    
    "use strict";
    
    app.filter('tabText', function(){
        return tabText;
    });
    
    function tabText(show){
        return show ? "Daten schliessen":"Daten zeigen";
    }
    
});

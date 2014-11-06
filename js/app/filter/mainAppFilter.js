
(function() {
    
    "use strict";
    
    angular
        .module('mainAppFilter', [])
        .filter('tabText', function(){
            return tabText;
        });
    
    function tabText(show){
        return show ? "Daten schliessen":"Daten zeigen";
    }
    
})();

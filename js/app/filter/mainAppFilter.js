(function() {
    
    "use strict";
    
    angular.module('mainAppFilter', [])
    .filter('dialogText', function(){
        return dialogText;
    });
    
    function dialogText(show){
        return show ? "Daten schliessen":"Dialog zeigen";
    }
    
})();

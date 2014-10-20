(function() {
    "use strict";

    angular.module('mainApp').factory('autoidFactory', autoidFactory);

    function autoidFactory () {
        /**
        * private get_autoId
        *
        * @description get back next autoid for each scope list data
        * @returns integer
        */
        function get_autoId(scopeData) {
            var r = 0;
            if(scopeData.length){
                for(var e in scopeData){
                    if(scopeData[e].id>r){r=scopeData[e].id*1}
                }
            }
            return ( ! r) ? 1 : r+=1;
        }
        /**
        * public getAutoId
        *
        * @description get back next autoid for each scope list data
        * @returns function
        */
        function getFuncautoId (scopeData) {
            var autoid = get_autoId(scopeData);
            var get_nextid = function(){
                var r = autoid;
                autoid+=1;
                return r
            }
            return get_nextid;
        }
        return {
            getFuncautoId : getFuncautoId
        }
    }    
})();

(function() {
    "use strict";

    angular.module('mainApp').factory('TplFactory', TplFactory);

    function TplFactory () {
        
        var config = {
            wrapperstatus : {}
        }
        /**
        * protect set_gameScoreDisplay
        *
        * @description set scoreDisplay CSS
        * @returns void
        */
        function showScoreDisplay(domelement,isactive){
            if(domelement!==""){
                if(isactive){
                    domelement.attributes.class.value += " active";
                }else{
                    domelement.attributes.class.value = domelement.attributes.class.value.replace(" active",'');
                }
            }else{
                angular.element("score-display").find("div.item").removeClass("active");
            }
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
        /**
        * public get
        *
        * @returns object
        */
        function get(){
            return config;
        }
        return {
            get            : get,
            showTabWrapper : showTabWrapper
        }
    }    
})();

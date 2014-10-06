(function() {
    "use strict";
    
    angular.module('mainApp').directive('scoreDisplay', scoreDisplay);
    
    function scoreDisplay() {
        var get_tpl = function(){
            var tpl = '<div class="item" ng-repeat="goal in goalsItemConf" ng-click="setGoal({goal_index:$index}, $event)" >{{goal.val}}</div>';
            tpl += '<div class="clearL"></div>';
            return tpl;
        }
        return {
            restrict: 'E',
            template:get_tpl(),
            //templateUrl: 'templates/directive-score-display-template.html',
            link : function (scope,element,attrs) {
                angular.element(element).hover(
                    function(){scope.activeDirectiveId = attrs.index;},
                    function(){scope.activeDirectiveId = "";}
                )
            }
        };
    }
})()
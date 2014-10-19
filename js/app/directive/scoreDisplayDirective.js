(function() {
    "use strict";
    
    angular.module('mainApp').directive('scoreDisplay', scoreDisplay);
    
    function scoreDisplay() {
        var get_tpl = function(){
            var tpl = '<div class="item" ng-repeat="goal in games.goalsItemConf" ng-click="setGoal($index, $event)" >{{goal.val}}</div>';
            //var tpl = '<div class="item" ng-model="shot_'+(i++)+'" ng-repeat="goal in games.goalsItemConf" >{{goal.val}}</div>';
            tpl += '<div class="clearL"></div>';
            return tpl;
        }
        return {
            restrict: 'E',
            //scope : { actulascore : 0 },
            scope : true,
            template:get_tpl(),
            //templateUrl: 'templates/directive-score-display-template.html',
            link : function (scope,element,attrs) {
                console.log("scoreDisplay:") 
                scope.actulascore = -1;
                angular.element(element).hover(
                    //function(){scope.games.activeDirectiveId = attrs.index;},
                    //function(){scope.games.activeDirectiveId = "";}
                    function(){scope.activeDirectiveId = attrs.index;},
                    function(){scope.activeDirectiveId = "";}
                );
                scope.setGoal = function(index, $event){
                    if(index == scope.actulascore || index < scope.actulascore && index+1 == scope.actulascore || index > scope.actulascore && index-1 == scope.actulascore ){
                        scope.actulascore = (scope.actulascore<index) ? index : scope.actulascore-1
                        console.log("scoreDisplay:"+scope.activeDirectiveId,index,scope.actulascore)   
                    }
                    
                };
            }
        };
    }
})();

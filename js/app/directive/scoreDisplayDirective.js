(function() {
    "use strict";
    
    angular.module('mainApp').directive('scoreDisplay', scoreDisplay);
    
    function scoreDisplay(notificationFactory) {
        var get_tpl = function(){
            var tpl = '<div class="item" ng-repeat="goal in games.goalsItemConf" ng-click="setGoal($index, $event)" >{{goal.val}}</div>';
            tpl += '<div class="clearL"></div>';
            return tpl;
        }
        return {
            restrict: 'E',
            scope : true,
            template:get_tpl(),
            //templateUrl: 'templates/directive-score-display-template.html',
            link : function (scope,element,attrs) {
                scope.actulascore = -1; 
                scope.status = "stop";
                angular.element(element).hover(
                    function(){scope.activeDirectiveId = attrs.index;},
                    function(){scope.activeDirectiveId = "";}
                );
                scope.setGoal = function(index, $event){
                    if(scope.status == "start"){
                        if(index == scope.actulascore){
                            scope.actulascore-=1;
                        }else if(index == scope.actulascore+1){
                            scope.actulascore+=1;
                        }else{
                            return;
                        }
                        var goalConf = {
                            teamid      : scope.activeDirectiveId,
                            goalid      : index,
                            actulascore : scope.actulascore
                        }
                        notificationFactory.trigger('scoreConfig',[goalConf]);
                    }
                };
                notificationFactory.on('scoreConfigStatus',function(){
                    scope.status = arguments[0];
                    scope.actulascore = -1;
                });
            }
        };
    }
})();

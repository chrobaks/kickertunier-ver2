(function() {
    "use strict";
    
    angular.module('mainApp').directive('scoreDisplay', scoreDisplay);

    scoreDisplay.$inject = [
        'notificationFactory'
    ];
    
    function scoreDisplay( notificationFactory ) {
        var get_tpl = function(){
            var tpl = '<div class="item" ng-repeat="goal in gmctrl.games.goalsItemConf" ng-click="setGoal($index, $event)" >{{goal.val}}</div>';
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
                scope.activeElements = [];
                scope.elementConfig = {
                    "activ" : {color : "#fff", backgroundColor : "#99cc00"},
                    "notactiv" : {color : "#000", backgroundColor : "#fff"}
                }
                angular.element(element).hover(
                    function(){scope.activeDirectiveId = attrs.index;},
                    function(){scope.activeDirectiveId = "";}
                );
                scope.setGoal = function(index, $event){
                    if(scope.status == "start"){
                        var status = "notactiv";
                        if(index == scope.actulascore){
                            scope.activeElements = scope.activeElements.filter(function(obj){if(obj.id != index){return obj}});
                            scope.actulascore-=1;
                        }else if(index == scope.actulascore+1){
                            scope.activeElements.push({id:index,obj:$event.target});
                            scope.actulascore+=1;
                            status = "activ";
                        }else{
                            return;
                        }
                        $event.target.style.color = scope.elementConfig[status].color;
                        $event.target.style.backgroundColor = scope.elementConfig[status].backgroundColor;
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
                    if(scope.activeElements.length){
                        for(var e in scope.activeElements){
                            scope.activeElements[e].obj.style.color = scope.elementConfig["notactiv"].color;
                            scope.activeElements[e].obj.style.backgroundColor = scope.elementConfig["notactiv"].backgroundColor;
                        }
                        scope.activeElements = [];
                    }
                });
            }
        };
    }
})();

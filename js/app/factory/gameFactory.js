(function() {
    
    "use strict";

    angular
        .module('mainApp')
        .factory('gameFactory', gameFactory);

    gameFactory.$inject = [
        'notificationFactory',
        'messageFactory',
        'appResource'
    ];
    
    function gameFactory (notificationFactory, messageFactory, appResource) {
        var games = {
            game : {
                team_1 : null,
                team_2 : null
            },
            gameData   : [],
            scoreData  : [],
            actualGameData : {
                team_1        : 'Kein Team',
                team_2        : 'Kein Team',
                team_1_id     : 0,
                team_2_id     : 0,
                team_1_scores : 0,
                team_2_scores : 0
            },
            goalsItemConf : [
                {val:'1'},
                {val:'2'},
                {val:'3'},
                {val:'4'},
                {val:'5'},
                {val:'6'},
                {val:'7'}
            ],
            teamData       : [],
            headertitle    : 'Control Game',
            formmsg        : 'Neues Spiel starten',
            gameIsRunning  : false
        }
        var returns = {
            get            : get,
            deleteGame     : deleteGame,
            startGame      : startGame,
            setGoal        : setGoal,
            updateGameData : updateGameData
        }
        /**
        * public updateGameData
        *
        * @description set check gamedata to gameteamdata
        * @returns void
        */
        function updateGameData(){
            appResource.game.getAll({"tournaments_id" : games.tournaments_id}).$promise.then(function(data) {
                games.gameData = data;
            });
            appResource.scorelist.getAll({"tournaments_id" : games.tournaments_id}).$promise.then(function(data) {
                games.scoreData = data;
            });
        }
        /**
        * public setGoal
        *
        * @description set goal value
        * @returns void
        */
        function setGoal(goalConf){
            if(games.gameIsRunning && goalConf.teamid !== ""){
                goalConf.teamid = goalConf.teamid*1+1;
                var teamscore = games.actualGameData["team_"+goalConf.teamid+"_scores"]*1;
                var goalval = games.goalsItemConf[goalConf.goalid].val*1;
                var gameHasWinner = false;
                if(goalConf.goalid == goalConf.actulascore){
                    games.actualGameData["team_"+goalConf.teamid+"_scores"] += 1;
                    if(games.actualGameData["team_"+goalConf.teamid+"_scores"]==games.goalsItemConf.length){
                        gameHasWinner = true;
                    }
                }else if(goalConf.goalid*1 > goalConf.actulascore*1){
                    games.actualGameData["team_"+goalConf.teamid+"_scores"] -= 1;
                }
                if(gameHasWinner){
                    if(messageFactory.get_confirm("game_has_winner",games.actualGameData["team_"+goalConf.teamid])){
                        addGame();
                    }else{
                        games.actualGameData["team_"+goalConf.teamid+"_scores"] -= 1;
                    }
                }
            }
        }
        /**
        * private setGameActualTeamData
        *
        * @description set default scope GameActualTeamData
        * @returns void
        */
        function setActiveGameData(){
            games.actualGameData = {
                team_1        : ((typeof games.game.team_1 == 'object') ? games.game.team_1.teamname :'Kein Team'),
                team_2        : ((typeof games.game.team_2 == 'object') ? games.game.team_2.teamname :'Kein Team'),
                team_1_id     : ((typeof games.game.team_1 == 'object') ? games.game.team_1.id :'0'),
                team_2_id     : ((typeof games.game.team_2 == 'object') ? games.game.team_2.id :'0'),
                team_1_scores : 0,
                team_2_scores : 0
            };
        }
        /**
        * private addGame
        *
        * @description
        * @returns void
        */
        function addGame() {
            var arg = {
                winner_id      : (games.actualGameData.team_1_scores > games.actualGameData.team_2_scores)? games.actualGameData.team_1_id:games.actualGameData.team_2_id,
                team_1         : games.actualGameData.team_1_id,
                team_2         : games.actualGameData.team_2_id,
                result         : games.actualGameData.team_1_scores+'/'+games.actualGameData.team_2_scores,
                tournaments_id : games.tournaments_id
            }

            appResource.game.set(angular.copy(arg)).$promise.then(function(data) {
                data.teamname_1 = games.actualGameData.team_1;
                data.teamname_2 = games.actualGameData.team_2;
                games.gameData.push(angular.copy(data));
                games.gameIsRunning = false;
                setActiveGameData();
                appResource.scorelist.getAll({"tournaments_id" : games.tournaments_id}).$promise.then(function(data) {
                    games.scoreData = data;
                });
                notificationFactory.trigger('scoreConfigStatus',["stop"]);
                notificationFactory.trigger('actualGameData',[games.actualGameData]);
            });
        }
        /**
        * public deleteGame
        *
        * @description
        * @returns void
        */
        function deleteGame(id) {
            appResource.game.del({"id":id}).$promise.then(function(data) {
                games.gameData = games.gameData.filter(function(obj){if(obj.id != id ){ return obj;}})
                appResource.scorelist.getAll().$promise.then(function(data) {
                    games.scoreData = data;
                });
            });
        }
        /**
        * public set_startGame
        *
        * @description valided gameform and if ok run add func
        * @returns boolean if form not valid than false
        */
        function startGame(form) {
            if ( ! form.$valid) {
                messageFactory.set_error("fields_need_content");
                game.formmsg = messageFactory.get_error();
            }else{
                setActiveGameData();
                games.game = {team_1: '', team_2: ''};
                games.gameIsRunning = true;
                notificationFactory.trigger('scoreConfigStatus',["start"]);
                notificationFactory.trigger('actualGameData',[games.actualGameData]);
            }
        }
        /**
        * public get
        *
        * @returns object
        */
        function get() {
            return games;
        }
        return returns;
    }    
})();

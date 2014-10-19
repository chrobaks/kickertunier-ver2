(function() {
    "use strict";

    angular.module('mainApp').factory('GameActionFactory', GameActionFactory );

    GameActionFactory.$inject = [
        'MessageFactory'
    ];

    function GameActionFactory( MessageFactory ) {
        var scopeStorage = {};
        var callbacks = {
            setGameDataHasTeamCeck : setGameDataHasTeamCeck,
            setGameScoreData       : setGameScoreData
        };
        /**
        * public set_startGame
        *
        * @description valided gameform and if ok run add func
        * @returns boolean if form not valid than false
        */
        function setStartGame() {
            if ( ! scopeStorage.gameForm.$valid) {
                MessageFactory.set_error("fields_need_content");
                scopeStorage.tpl.formmsg.game = MessageFactory.get_error();
            }else{
                scopeStorage.games.setGameActualTeamData();
                scopeStorage.games.game = {team_1: '', team_2: ''};
                scopeStorage.games.gameIsRunning = true;
                scopeStorage.tpl.showScoreDisplay("",false);
            }
        }
        /**
        * private fillScoreList
        *
        * @description fill scoreList Objects
        * @returns void
        */
        function fillScoreList(fill, list, teamid, teamkey){
            if(typeof fill[teamid] !== 'undefined'){
                fill[teamid].gamecounts += 1;
            }else if(typeof fill[teamid] === 'undefined'){
                fill[teamid] = {teamname: list[teamkey], gamecounts: 1, totalpoints: 0};
            }
            if(list[teamkey]===list.team_win){
                fill[teamid].totalpoints += 1;
            }
            return fill;
        }
        /**
        * private setGameScoreData
        *
        * @description set scoreList Data
        * @returns void
        */
        function setGameScoreData(){
            var list = [];
            var teamid_1 = '';
            var teamid_2 = '';
            scopeStorage.games.gameScoreData = [];
            if(scopeStorage.games.gameData.length){
                for(var e in scopeStorage.games.gameData){
                    teamid_1 = scopeStorage.teams.getIdByTeamname(scopeStorage.games.gameData[e].team_1);
                    teamid_2 = scopeStorage.teams.getIdByTeamname(scopeStorage.games.gameData[e].team_2);
                    if(teamid_1 !== null && teamid_2 !== null ){
                        list = fillScoreList(list, scopeStorage.games.gameData[e], "teamid"+teamid_1, 'team_1');
                        list = fillScoreList(list, scopeStorage.games.gameData[e], "teamid"+teamid_2, 'team_2');
                    }
                }
                for(var m in list){
                    scopeStorage.games.gameScoreData.push(list[m]);
                }
            }
        }
        /**
        * public setGoal
        *
        * @description set goal value
        * @returns void
        */
        function setGoal(domelement,obj){
            if(scopeStorage.games.activeDirectiveId !== "" && scopeStorage.games.gameIsRunning === true){
                var teamnumber = scopeStorage.games.activeDirectiveId*1+1;
                var goalid = obj.goal_index*1;
                var teamscore = scopeStorage.games.gameActualTeamData["team_"+teamnumber+"_scores"]*1;
                var goalval = scopeStorage.games.goalsItemConf[goalid].val*1;
                var gameHasWinner = false;
                if(teamscore+1 === goalval){
                    scopeStorage.games.gameActualTeamData["team_"+teamnumber+"_scores"] = goalval;
                    scopeStorage.tpl.showScoreDisplay(domelement,true);
                    if(goalval===scopeStorage.games.goalsItemConf.length){
                       gameHasWinner = true;
                    }
                }else if(teamscore === goalval){
                    scopeStorage.games.gameActualTeamData["team_"+teamnumber+"_scores"] -= 1;
                    scopeStorage.tpl.showScoreDisplay(domelement,false);
                }

                if(gameHasWinner){
                    if(MessageFactory.get_confirm("game_has_winner",scopeStorage.games.gameActualTeamData["team_"+teamnumber])){
                        setGameWinner();
                    }else{
                        scopeStorage.games.gameActualTeamData["team_"+teamnumber+"_scores"] -= 1;
                        scopeStorage.tpl.showScoreDisplay(domelement,false);
                    }
                }
            }
        }
        /**
        * private set_gameWinner
        *
        * @description set game winner to gameData
        * @returns void
        */
        function setGameWinner(){
            scopeStorage.games.addGame();
            scopeStorage.games.gameIsRunning = false;
            scopeStorage.tpl.showScoreDisplay("",false);
        }
        /**
        * private set_gameDataHasTeamCeck
        *
        * @description set check gamedata to gameteamdata
        * @returns void
        */
        function setGameDataHasTeamCeck(){
            var teams = scopeStorage.teams.getTeamnames();
            var gamedata_new = [];
            for( var n in scopeStorage.games.gameData){
                if(teams.indexOf(scopeStorage.games.gameData[n].team_1) !== -1  && teams.indexOf(scopeStorage.games.gameData[n].team_2) !== -1 ){
                    gamedata_new.push(scopeStorage.games.gameData[n]);
                }
            }
            if(gamedata_new.length < scopeStorage.games.gameData.length){
                scopeStorage.games.gameData = gamedata_new;
            }
        }
        /**
        * public set_init
        *
        * @description
        * @returns void
        */
        function init( scope){
            scopeStorage = scope;

        }
        return {
            init         : init,
            setStartGame : setStartGame,
            setGoal      : setGoal
        }
    }
    
})();

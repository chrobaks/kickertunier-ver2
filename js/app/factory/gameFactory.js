(function() {
    "use strict";

    angular.module('mainApp').factory('GameFactory', GameFactory);

    GameFactory.$inject = [
        'GridFactory',
        'AutoIdFactory',
        'MessageFactory'
    ];

    function GameFactory(GridFactory, AutoIdFactory, MessageFactory) {
        var scopeStorage = {};
        /**
        * public get_gameIsRunning
        *
        * @returns boolean
        */
        function get_gameIsRunning() {
           return scopeStorage.games.gameIsRunning;
        }
        /**
        * public get_teamname
        *
        * @description get teamname by id or flag
        * @returns string
        */
        function get_teamname(id) {
            var r = (arguments.length>1) ? [] : '';
            var flag = (arguments.length>1) ? arguments[1] : '';
            for(var e in scopeStorage.teams.teamData){
                if(flag == ''){
                    if(scopeStorage.teams.teamData[e].id==id){
                        r=scopeStorage.teams.teamData[e].teamname;
                        break;
                    }
                }else{
                    if(flag == '-a'){
                        r.push(scopeStorage.teams.teamData[e].teamname);
                    }
                }
            }
            return r;
        }
        /**
        * public get_teamid
        *
        * @description get teamid by teamname
        * @returns number
        */
        var get_teamid = function (teamname) {
            var r = "";
            for(var e in scopeStorage.teams.teamData){
                if(scopeStorage.teams.teamData[e].teamname==teamname){
                    r=scopeStorage.teams.teamData[e].id;
                    break;
                }
            }
            return r;
        }
        /**
        * private set_gameScoreDisplay
        *
        * @description set scoreDisplay CSS
        * @returns void
        */
        var set_gameScoreDisplayStyle = function(domelement,isactive){
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
        * private set_defaultGameActualTeamData
        *
        * @description set default scope GameActualTeamData
        * @returns void
        */
        var set_defaultGameActualTeamData = function(){
            scopeStorage.games.gameActualTeamData = {
                team_1: 'Kein Team',
                team_2: 'Kein Team',
                team_1_scores: 0,
                team_2_scores: 0
            };
        }
        /**
        * private set_startGameData
        *
        * @description set new game data
        * @returns void
        */
        var set_newGameActualTeamData = function () {
            var newgame = {
                team_1: scopeStorage.games.game.team_1.teamname,
                team_2: scopeStorage.games.game.team_2.teamname,
                team_1_scores: 0,
                team_2_scores: 0
            };
            scopeStorage.games.gameActualTeamData = angular.copy(newgame);
            scopeStorage.games.game = {team_1: '', team_2: ''};
            scopeStorage.games.gameIsRunning = true;
            set_gameScoreDisplayStyle("",false);
        }
        /**
        * public set_startGame
        *
        * @description valided gameform and if ok run add func
        * @returns boolean if form not valid than false
        */
        var set_startGame = function () {
            var actionOk = true;
            if ( ! scopeStorage.gameForm.$valid) {
                MessageFactory.set_error("fields_need_content");
                actionOk = false;
            }

            if(actionOk){
                set_newGameActualTeamData();
            }else{
                scopeStorage.tpl.formmsg.game = MessageFactory.get_error();
            }
        }
        /**
        * private set_gameScoreList
        *
        * @description set scoreList Data
        * @returns void
        */
        var set_gameScoreList = function(){
            var list = [];
            var teamid_1 = '';
            var teamid_2 = '';
            scopeStorage.games.gameScoreData = [];
            if(scopeStorage.games.gameData.length){
                for(var e in scopeStorage.games.gameData){
                    teamid_1 = get_teamid(scopeStorage.games.gameData[e].team_1);
                    teamid_2 = get_teamid(scopeStorage.games.gameData[e].team_2);
                    // SET FIRST TEAM
                    if(typeof list[teamid_1] !== 'undefined'){
                        list[teamid_1].gamecounts += 1;
                    }else if(typeof list[teamid_1] === 'undefined'){
                        list[teamid_1] = {teamname: scopeStorage.games.gameData[e].team_1, gamecounts: 1, totalpoints: 0};
                    }
                    if(scopeStorage.games.gameData[e].team_1===scopeStorage.games.gameData[e].team_win){
                        list[teamid_1].totalpoints += 1;
                    }
                    // SET SECOND TEAM
                    if(typeof list[teamid_2] !== 'undefined'){
                        list[teamid_2].gamecounts += 1;
                    }else if(typeof list[teamid_2] === 'undefined'){
                        list[teamid_2] = {teamname: scopeStorage.games.gameData[e].team_2, gamecounts: 1, totalpoints: 0};
                    }
                    if(scopeStorage.games.gameData[e].team_2===scopeStorage.games.gameData[e].team_win){
                        list[teamid_2].totalpoints += 1;
                    }

                }
                for(var n in list){
                    scopeStorage.games.gameScoreData.push(list[n]);
                }
            }
        }
        /**
        * public set_gameActualTeamData
        *
        * @description set goal value
        * @returns void
        */
        var set_gameActualTeamData = function(domelement,obj){
            if(scopeStorage.games.activeDirectiveId !== "" && scopeStorage.games.gameIsRunning === true){
                var teamnumber = scopeStorage.games.activeDirectiveId*1+1;
                var goalid = obj.goal_index*1;
                var teamscore = scopeStorage.games.gameActualTeamData["team_"+teamnumber+"_scores"]*1;
                var goalval = scopeStorage.games.goalsItemConf[goalid].val*1;
                var gameHasWinner = false;
                if(teamscore+1 === goalval){
                    scopeStorage.games.gameActualTeamData["team_"+teamnumber+"_scores"] = goalval;
                    set_gameScoreDisplayStyle(domelement,true);
                    if(goalval===scopeStorage.games.goalsItemConf.length){
                       gameHasWinner = true;
                    }
                }else if(teamscore === goalval){
                    scopeStorage.games.gameActualTeamData["team_"+teamnumber+"_scores"] -= 1;
                    set_gameScoreDisplayStyle(domelement,false);
                }

                if(gameHasWinner){
                    if(MessageFactory.get_confirm("game_has_winner",scopeStorage.games.gameActualTeamData["team_"+teamnumber])){
                        set_gameWinner();
                    }else{
                        scopeStorage.games.gameActualTeamData["team_"+teamnumber+"_scores"] -= 1;
                        set_gameScoreDisplayStyle(domelement,false);
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
        var set_gameWinner = function(){
            var gamelist_arg = {
                team_win:(scopeStorage.games.gameActualTeamData.team_1_scores>scopeStorage.games.gameActualTeamData.team_2_scores)? scopeStorage.games.gameActualTeamData.team_1:scopeStorage.games.gameActualTeamData.team_2,
                team_1: scopeStorage.games.gameActualTeamData.team_1,
                team_2: scopeStorage.games.gameActualTeamData.team_2,
                result: scopeStorage.games.gameActualTeamData.team_1_scores+' : '+scopeStorage.games.gameActualTeamData.team_2_scores,
                id: scopeStorage.games.gameAutoId()
            }
            scopeStorage.games.gameData.push(gamelist_arg);
            set_defaultGameActualTeamData();
            set_gameScoreDisplayStyle("",false);
            scopeStorage.games.gameIsRunning = false;
        }
        /**
        * private set_gameDataHasTeamCeck
        *
        * @description set check gamedata to gameteamdata
        * @returns void
        */
        var set_gameDataHasTeamCeck = function(){
            var teams = get_teamname(0,'-a');
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
        * private set_scopeWatcher
        *
        * @description set scope watcher
        * @returns void
        */
        var set_scopeWatcher = function(){
            scopeStorage.$watch('games.gameData',
                function(){
                    set_gameScoreList();
                },
                true
            );
            scopeStorage.$watch('teams.teamData',
                function(){
                    set_gameDataHasTeamCeck();
                },
                true
            );
            scopeStorage.$watch('teams.team.player_1',
                function(){
                    if(scopeStorage.teams.team.player_1 && scopeStorage.teams.team.player_2){
                        if(scopeStorage.teams.team.player_1.nickname === scopeStorage.teams.team.player_2.nickname)
                        scopeStorage.teams.team.player_2 = null
                    }
                },
                true
            );
            scopeStorage.$watch('teams.team.player_2',
                function(){
                    if(scopeStorage.teams.team.player_1 && scopeStorage.teams.team.player_2){
                        if(scopeStorage.teams.team.player_1.nickname === scopeStorage.teams.team.player_2.nickname)
                        scopeStorage.teams.team.player_2 = null
                    }
                },
                true
            );
            scopeStorage.$watch('games.game.team_1',
                function(){
                    if(scopeStorage.games.game.team_1 && scopeStorage.games.game.team_2){
                        if(scopeStorage.games.game.team_1.teamname === scopeStorage.games.game.team_2.teamname)
                        scopeStorage.games.game.team_2 = null
                    }
                },
                true
            );
            scopeStorage.$watch('games.game.team_2',
                function(){
                    if(scopeStorage.games.game.team_1 && scopeStorage.games.game.team_2){
                        if(scopeStorage.games.game.team_1.teamname === scopeStorage.games.game.team_2.teamname)
                        scopeStorage.games.game.team_2 = null
                    }
                },
                true
            );
        }
        /**
        * public set_init
        *
        * @description set default scope data
        * @returns void
        */
        function set_initialze( scope){
            scopeStorage = scope;
            scopeStorage.users.userAutoId = AutoIdFactory.getFuncautoId(scope.users.userData);
            scopeStorage.teams.teamAutoId = AutoIdFactory.getFuncautoId(scope.teams.teamData);
            scopeStorage.games.gameAutoId = AutoIdFactory.getFuncautoId(scope.games.gameData);
            GridFactory.setGridOptons(scope);
            set_scopeWatcher();
        }
        return {
            set_initialze: set_initialze,
            set_startGame: set_startGame,
            set_gameActualTeamData: set_gameActualTeamData
        }
    }
    
})()
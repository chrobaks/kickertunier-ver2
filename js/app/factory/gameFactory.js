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
        * private set_gameScoreDisplay
        *
        * @description set scoreDisplay CSS
        * @returns void
        */
        function setGameScoreDisplayStyle(domelement,isactive){
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
        * private setGameActualTeamData
        *
        * @description set default scope GameActualTeamData
        * @returns void
        */
        function setGameActualTeamData(){
            scopeStorage.games.gameActualTeamData = {
                team_1: ((typeof scopeStorage.games.game.team_1 == 'object') ? scopeStorage.games.game.team_1.teamname :'Kein Team'),
                team_2: ((typeof scopeStorage.games.game.team_2 == 'object') ? scopeStorage.games.game.team_2.teamname :'Kein Team'),
                team_1_scores: 0,
                team_2_scores: 0
            };
        }
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
                setGameActualTeamData();
                scopeStorage.games.game = {team_1: '', team_2: ''};
                scopeStorage.games.gameIsRunning = true;
                setGameScoreDisplayStyle("",false);
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
        * private setGameScoreList
        *
        * @description set scoreList Data
        * @returns void
        */
        function setGameScoreList(){
            var list = [];
            var teamid_1 = '';
            var teamid_2 = '';
            scopeStorage.games.gameScoreData = [];
            console.log("setGameScoreList")
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
        * public set_gameActualTeamData
        *
        * @description set goal value
        * @returns void
        */
        function setGameActualTeamData(domelement,obj){
            if(scopeStorage.games.activeDirectiveId !== "" && scopeStorage.games.gameIsRunning === true){
                var teamnumber = scopeStorage.games.activeDirectiveId*1+1;
                var goalid = obj.goal_index*1;
                var teamscore = scopeStorage.games.gameActualTeamData["team_"+teamnumber+"_scores"]*1;
                var goalval = scopeStorage.games.goalsItemConf[goalid].val*1;
                var gameHasWinner = false;
                if(teamscore+1 === goalval){
                    scopeStorage.games.gameActualTeamData["team_"+teamnumber+"_scores"] = goalval;
                    setGameScoreDisplayStyle(domelement,true);
                    if(goalval===scopeStorage.games.goalsItemConf.length){
                       gameHasWinner = true;
                    }
                }else if(teamscore === goalval){
                    scopeStorage.games.gameActualTeamData["team_"+teamnumber+"_scores"] -= 1;
                    setGameScoreDisplayStyle(domelement,false);
                }

                if(gameHasWinner){
                    if(MessageFactory.get_confirm("game_has_winner",scopeStorage.games.gameActualTeamData["team_"+teamnumber])){
                        setGameWinner();
                    }else{
                        scopeStorage.games.gameActualTeamData["team_"+teamnumber+"_scores"] -= 1;
                        setGameScoreDisplayStyle(domelement,false);
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
            var gamelist_arg = {
                team_win:(scopeStorage.games.gameActualTeamData.team_1_scores>scopeStorage.games.gameActualTeamData.team_2_scores)? scopeStorage.games.gameActualTeamData.team_1:scopeStorage.games.gameActualTeamData.team_2,
                team_1: scopeStorage.games.gameActualTeamData.team_1,
                team_2: scopeStorage.games.gameActualTeamData.team_2,
                result: scopeStorage.games.gameActualTeamData.team_1_scores+' : '+scopeStorage.games.gameActualTeamData.team_2_scores,
                id: scopeStorage.games.gameAutoId()
            }
            scopeStorage.games.gameData.push(gamelist_arg);
            setGameActualTeamData();
            setGameScoreDisplayStyle("",false);
            scopeStorage.games.gameIsRunning = false;
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
        * private set_scopeWatcher
        *
        * @description set scope watcher
        * @returns void
        */
        function setScopeWatcher(){
            scopeStorage.$watch('games.gameData',
                function(){
                    setGameScoreList();
                },
                true
            );
            scopeStorage.$watch('teams.teamData',
                function(){
                    setGameDataHasTeamCeck();
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
        function setInitialze( scope){
            scopeStorage = scope;
            scopeStorage.users.userAutoId = AutoIdFactory.getFuncautoId(scope.users.userData);
            scopeStorage.teams.teamAutoId = AutoIdFactory.getFuncautoId(scope.teams.teamData);
            scopeStorage.games.gameAutoId = AutoIdFactory.getFuncautoId(scope.games.gameData);
            setScopeWatcher();
            GridFactory.setGridOptons(scope);
        }
        return {
            setInitialze: setInitialze,
            setStartGame: setStartGame,
            setGameActualTeamData: setGameActualTeamData
        }
    }
    
})()
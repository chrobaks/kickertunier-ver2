(function() {
    "use strict";

    angular.module('mainApp').factory('gameFactory', gameFactory);

    gameFactory.$inject = [
        'notificationFactory',
        'messageFactory'
    ];
    
    function gameFactory (notificationFactory, messageFactory) {
        var init = 0;
        var games = {
            game : {
                team_1 : null,
                team_2 : null
            },
            gameData : [
                {team_win: 'Ateam',team_1: 'Ateam', team_2: 'Vollenergie', result: '7 : 1', id: 1},
                {team_win: 'Vollenergie',team_1: 'Ateam', team_2: 'Vollenergie', result: '3 : 7', id: 2}
            ],
            scoreData : [],
            actualGameData : {
                team_1        : 'Kein Team',
                team_2        : 'Kein Team',
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
            gameAutoId     : null,
            gameIsRunning  : false
        }
        /* notifications listener */
        notificationFactory.on('init',function(){
            if(!init){
                notificationFactory.trigger('actualGameData',[games.actualGameData]);
                notificationFactory.trigger('gameIsRunning',[games.gameIsRunning]);
                setScoreData();
                init=1;
            }
        });
        notificationFactory.trigger('actualGameData',[games.actualGameData]);
        notificationFactory.trigger('gameIsRunning',[games.gameIsRunning]);
        notificationFactory.on('teamData',function(){
            games.teamData = arguments[0];
        });
        notificationFactory.on('deleteTeamData',function(){
            games.teamData = arguments[0];
            updateGameData();
        });
        notificationFactory.on('scoreConfig',function(){
            setGoal(arguments[0]);
        });
        /**
        * private updateGameData
        *
        * @description set check gamedata to gameteamdata
        * @returns void
        */
        function updateGameData(){
            var teams = games.teamData.map(function(obj){return obj.teamname;});
            var gamedata_new = [];
            for( var n in games.gameData){
                if(teams.indexOf(games.gameData[n].team_1) !== -1  && teams.indexOf(games.gameData[n].team_2) !== -1 ){
                    gamedata_new.push(games.gameData[n]);
                }
            }
            if(gamedata_new.length < games.gameData.length){
                games.gameData = gamedata_new;
                setScoreData();
            }
        }
        /**
        * private setGoal
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
                        setGameWinner();
                    }else{
                        games.actualGameData["team_"+goalConf.teamid+"_scores"] -= 1;
                    }
                }
            }
        }
        /**
        * private setGameWinner
        *
        * @description set game winner to gameData
        * @returns void
        */
        function setGameWinner(){
            addGame();
            setScoreData();
            setActiveGameData();
            games.gameIsRunning = false;
            notificationFactory.trigger('scoreConfigStatus',["stop"]);
            notificationFactory.trigger('actualGameData',[games.actualGameData]);
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
        * private setScoreData
        *
        * @description set scoreList Data
        * @returns void
        */
        function setScoreData(){
            var team_1 = {};
            var team_2 = {};
            var list = [];
            games.scoreData = [];
            if(games.gameData.length){
                for(var e in games.gameData){
                    team_1 = games.teamData.filter(function(obj){if(obj.teamname != games.gameData[e].team_1 ){ return obj;}});
                    team_2 = games.teamData.filter(function(obj){if(obj.teamname != games.gameData[e].team_2 ){ return obj;}});
                    if(team_1.length && team_2.length ){
                        list = fillScoreList(list, games.gameData[e], "teamid"+team_1[0].id, 'team_1');
                        list = fillScoreList(list, games.gameData[e], "teamid"+team_2[0].id, 'team_2');
                    }
                }
                for(var m in list){
                    games.scoreData.push(list[m]);
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
                team_win : (games.actualGameData.team_1_scores>games.actualGameData.team_2_scores)? games.actualGameData.team_1:games.actualGameData.team_2,
                team_1   : games.actualGameData.team_1,
                team_2   : games.actualGameData.team_2,
                result   : games.actualGameData.team_1_scores+' : '+games.actualGameData.team_2_scores,
                id       : games.gameAutoId()
            }
            games.gameData.push(arg);
        }
        /**
        * public deleteGame
        *
        * @description
        * @returns void
        */
        function deleteGame(id) {
            games.gameData = games.gameData.filter(function(obj){if(obj.id != id){return obj}});
            setScoreData();
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
        return {
            get        : get,
            deleteGame : deleteGame,
            startGame  : startGame
        }
    }    
})();

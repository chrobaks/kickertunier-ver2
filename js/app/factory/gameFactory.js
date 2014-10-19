(function() {
    "use strict";

    angular.module('mainApp').factory('GameFactory', GameFactory);

    GameFactory.$inject = [
        'notificationFactory',
        'MessageFactory'
    ];
    
    function GameFactory (notificationFactory, MessageFactory) {
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
            gameColumnsDef : [
                {field: 'team_1', displayName: 'Team 1'},
                {field: 'team_2', displayName: 'Team 2'},
                {field: 'result', displayName: 'Ergebnis'},
                {
                    displayName  : 'Aktion',
                    cellTemplate : 'templates/grid-options-game-template.html'
                }
            ],
            scoreColumnsDef : [
                {field: 'teamname', displayName: 'Teamname'},
                {field: 'gamecounts', displayName: 'Anzahl Spiele'},
                {field: 'totalpoints', displayName: 'Punkte'}
            ],
            goalsItemConf : [
                {val:'1'},
                {val:'2'},
                {val:'3'},
                {val:'4'},
                {val:'5'},
                {val:'6'},
                {val:'7'}
            ],
            teamData : [],
            gameActualTeamData : {
                team_1        : 'Kein Team',
                team_2        : 'Kein Team',
                team_1_scores : 0,
                team_2_scores : 0
            },
            headertitle           : 'Control Game',
            formmsg               : 'Neues Spiel starten',
            gameAutoId            : null,
            gameIsRunning         : false,
            activeDirectiveId     : '',
            setGameActualTeamData : setGameActualTeamData,
            addGame               : addGame
        }
        
        notificationFactory.on('init',function(){
            if(!init){
                notificationFactory.trigger('gameActualTeamData',[games.gameActualTeamData]);
                notificationFactory.trigger('gameIsRunning',[games.gameIsRunning]);
                setGameScoreData();
                init=1;
                console.log("game init");
            }
        });
        notificationFactory.on('teamData',function(){
            games.teamData = arguments[0];
        });
        
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
                        //console.log(teamid_1[0],)
                    }
                }
                for(var m in list){
                    games.scoreData.push(list[m]);
                }
            }
        }
        /**
        * protect setGameActualTeamData
        *
        * @description set default scope GameActualTeamData
        * @returns void
        */
        function setGameActualTeamData(){
            games.gameActualTeamData = {
                team_1        : ((typeof games.game.team_1 == 'object') ? games.game.team_1.teamname :'Kein Team'),
                team_2        : ((typeof games.game.team_2 == 'object') ? games.game.team_2.teamname :'Kein Team'),
                team_1_scores : 0,
                team_2_scores : 0
            };
        }
        /**
        * protect addGame
        *
        * @description
        * @returns void
        */
        function addGame() {
            var arg = {
                team_win : (games.gameActualTeamData.team_1_scores>games.gameActualTeamData.team_2_scores)? games.gameActualTeamData.team_1:games.gameActualTeamData.team_2,
                team_1   : games.gameActualTeamData.team_1,
                team_2   : games.gameActualTeamData.team_2,
                result   : games.gameActualTeamData.team_1_scores+' : '+games.gameActualTeamData.team_2_scores,
                id       : games.gameAutoId()
            }
            games.gameData.push(arg);
            games.setGameActualTeamData();
        }
        /**
        * public deleteGame
        *
        * @description
        * @returns void
        */
        function deleteGame(id) {
            games.gameData = games.gameData.filter(function(obj){if(obj.id != id){return obj}});
        }
        /**
        * public get
        *
        * @returns object
        */
        /**
        * public set_startGame
        *
        * @description valided gameform and if ok run add func
        * @returns boolean if form not valid than false
        */
        function setStartGame(form) {
            if ( ! form.$valid) {
                MessageFactory.set_error("fields_need_content");
                game.formmsg = MessageFactory.get_error();
            }else{
                games.setGameActualTeamData();
                games.game = {team_1: '', team_2: ''};
                games.gameIsRunning = true;
                scopeStorage.tpl.showScoreDisplay("",false);
            }
        }
        function get() {
            return games;
        }
        return {
            get        : get,
            deleteGame : deleteGame
        }
    }    
})();

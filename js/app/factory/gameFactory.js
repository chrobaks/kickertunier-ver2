(function() {
    "use strict";

    angular.module('mainApp').factory('GameFactory', GameFactory);

    GameFactory.$inject = [
        'MessageFactory'
    ];

    function GameFactory(MessageFactory) {
        var scopeStorage = {}
        /**
        * public func_autoId
        *
        * @description closure method
        * @returns function
        */
        function get_funcautoId(key) {
            var autoid = get_autoId(key);
            var get_nextid = function(){
                var r = autoid;
                autoid+=1;
                return r
            }
            return get_nextid;
        }
        /**
        * private get_autoId
        *
        * @description get back next autoid for each scope list data
        * @returns integer
        */
        function get_autoId(key) {
            var r = 0;
            if(scopeStorage[key+"Data"].length){
                for(var e in scopeStorage[key+"Data"]){
                    if(scopeStorage[key+"Data"][e].id>r){r=scopeStorage[key+"Data"][e].id*1}
                }
            }
            return ( ! r) ? 1 : r+=1;
        }
        function set_gridOptions(wrapperid){
            
            switch(wrapperid){
                case('user'):
                    scopeStorage.gridOptionsUser = {
                        data: 'userData',
                        columnDefs: 'userColumnsDef'
                    };
                break;
                case('team'):
                    scopeStorage.gridOptionsTeam = {
                        data: 'teamData',
                        columnDefs: 'teamColumnsDef'
                    };
                break;
                case('game'):
                    scopeStorage.gridOptionsGame = {
                        data: 'gameData',
                        columnDefs: 'gameColumnsDef'
                    };
                    scopeStorage.gridOptionsGameScore = {
                        data: 'gameScoreData',
                        columnDefs: 'scoreColumnsDef',
                        sortInfo: { fields: ['totalpoints'], directions: ['desc']}
                    };
                break;
            }
            
        }
        /**
        * public get_gameIsRunning
        *
        * @returns boolean
        */
        function get_gameIsRunning() {
           return scopeStorage.gameIsRunning;
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
            for(var e in scopeStorage.teamData){
                if(flag == ''){
                    if(scopeStorage.teamData[e].id==id){
                        r=scopeStorage.teamData[e].teamname;
                        break;
                    }
                }else{
                    if(flag == '-a'){
                        r.push(scopeStorage.teamData[e].teamname);
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
            for(var e in scopeStorage.teamData){
                if(scopeStorage.teamData[e].teamname==teamname){
                    r=scopeStorage.teamData[e].id;
                    break;
                }
            }
            return r;
        }
        /**
        * private get_nickname
        *
        * @description get nickname by id
        * @returns string
        */
        function get_nickname(id) {
            var r = "";
            for(var e in scopeStorage.userData){
                if(scopeStorage.userData[e].id==id){
                    r=scopeStorage.userData[e].nickname;
                    break;
                }
            }
            return r;
        }
        /**
        * private get_checkTeamNotDiff
        *
        * @returns boolean if team_1.teamname is not same team_2.teamname than false
        */
        var get_checkTeamNotDiff = function () {
            return (scopeStorage.game.team_1.teamname===scopeStorage.game.team_2.teamname);
        }
        /**
        * private get_checkNicknameUnique
        *
        * @returns boolean if nickname not unique than false
        */
        function get_checkNicknameUnique(){
            var r = true;
            if(scopeStorage.userData.length){
                for(var e in scopeStorage.userData){
                    if(scopeStorage.userData[e].nickname==scopeStorage.user.nickname){r=false;break;}
                }
            }
            return r;
        }
        /**
        * private get_checkTeamnameUnique
        *
        * @returns boolean if teamname not unique than false
        */
        function get_checkTeamnameUnique() {
            var r = true;
            if(scopeStorage.teamData.length){
                for(var e in scopeStorage.teamData){
                    if(scopeStorage.teamData[e].teamname==scopeStorage.team.teamname){r=false;break;}
                }
            }
            return r;
        }
        /**
        * private get_checkPlayerNotDiff
        *
        * @returns boolean if player_1.nickname is not same player_2.nickname than false
        */
        function get_checkPlayerNotDiff() {
            return (scopeStorage.team.player_1.nickname===scopeStorage.team.player_2.nickname);
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
        * public get_checkUserIsInTeam
        *
        * @description check if team contains user by userid
        * @returns boolean
        */
        function get_checkUserIsInTeam(userid) {
            var isin = false;
            var ncknm = get_nickname(userid);
            if(ncknm){
                for(var e in scopeStorage.teamData){
                    if(scopeStorage.teamData[e].player_1==ncknm || scopeStorage.teamData[e].player_2==ncknm){
                        isin = true;
                        break;
                    }
                }
            }
            return isin;
        }
        /**
        * public get_checkTeamIsInActiveGame
        *
        * @description check if team is playing
        * @returns boolean
        */
        function get_checkTeamIsInActiveGame(teamid) {
            var isin = false;
            if(get_gameIsRunning()){
                var tmnm = get_teamname(teamid);
                if(tmnm){
                    isin = ( scopeStorage.gameActualTeamData.team_1===tmnm || scopeStorage.gameActualTeamData.team_2===tmnm ) ? true : false;
                }
            }
            return isin;
        }
        /**
        * private set_defaultGameActualTeamData
        *
        * @description set default scope GameActualTeamData
        * @returns void
        */
        var set_defaultGameActualTeamData = function(){
            scopeStorage.gameActualTeamData = {
                team_1: 'Kein Team',
                team_2: 'Kein Team',
                team_1_scores: 0,
                team_2_scores: 0
            };
        }
        /**
        * private set_addUserData
        *
        * @description set new user
        * @returns void
        */
        function set_addUserData() {
            scopeStorage.user.id = scopeStorage.userAutoId();
            scopeStorage.userData.push(angular.copy(scopeStorage.user));
            set_gridOptions('user');
            scopeStorage.user = {nickname: '', firstname: '', secondname: '', id: 0};
        }
        /**
        * public set_addUser
        *
        * @description valided userform and if ok run add func
        * @returns boolean if form not valid than false
        */
        function set_addUser() {
            var actionOk = true;
            if ( ! scopeStorage.userForm.$valid) {
                MessageFactory.set_error("fields_need_content");
                return false;
            }
            if( ! get_checkNicknameUnique()){
                MessageFactory.set_error("nickname_exist");
                actionOk = false;
            }
            if(actionOk){
                set_addUserData();
            }
            if( ! actionOk)
            scopeStorage.formmsg.user = MessageFactory.get_error();
        }
        /**
        * private set_addTeamData
        *
        * @description set new team
        * @returns void
        */
        function set_addTeamData() {
            var newteam = {
                teamname: scopeStorage.team.teamname,
                player_1: scopeStorage.team.player_1.nickname,
                player_2: scopeStorage.team.player_2.nickname,
                id: scopeStorage.teamAutoId()
            };
            scopeStorage.teamData.push(angular.copy(newteam));
            set_gridOptions('team');
            scopeStorage.team = {teamname: '', player_1: '', player_2: '', id: 0};
        }
        /**
        * public set_addTeam
        *
        * @description valided teamform and if ok run add func
        * @returns boolean if form not valid than false
        */
         function set_addTeam() {
            var actionOk = true;
            if ( ! scopeStorage.teamForm.$valid) {
                MessageFactory.set_error("fields_need_content");
                return false;
            }
            if( ! get_checkTeamnameUnique()){
                MessageFactory.set_error("teamname_exist");
                actionOk = false;
            }
            if(get_checkPlayerNotDiff()){
                MessageFactory.set_error("team_need_two_player");
                scopeStorage.team.player_2 = "";
                actionOk = false;
            }

            if(actionOk){
                set_addTeamData();
            }
            
            if( ! actionOk)
            scopeStorage.formmsg.team = MessageFactory.get_error();
        }
        /**
        * private set_startGameData
        *
        * @description set new game data
        * @returns void
        */
        var set_newGameActualTeamData = function () {
            var newgame = {
                team_1: scopeStorage.game.team_1.teamname,
                team_2: scopeStorage.game.team_2.teamname,
                team_1_scores: 0,
                team_2_scores: 0
            };
            scopeStorage.gameActualTeamData = angular.copy(newgame);
            scopeStorage.game = {team_1: '', team_2: ''};
            scopeStorage.gameIsRunning = true;
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
            if(get_checkTeamNotDiff() && actionOk){
                MessageFactory.set_error("game_need_two_teams");
                scopeStorage.game.team_2 = "";
                actionOk = false;
            }

            if(actionOk){
                set_newGameActualTeamData();
            }else{
                scopeStorage.formmsg.game = MessageFactory.get_error();
            }
        }
        /**
        * public set_deleteGame
        *
        * @description
        * @returns boolean
        */
        /**
        * public set_deleteUser
        *
        * @description valided user not in a team and if ok delete
        * @returns boolean if user in a team than false
        */
        function set_deleteUser(id) {
            var res = [];
            var actionOk = false;
            if( get_checkUserIsInTeam(id) ){
                MessageFactory.set_error("player_is_in_team");
            }else{
                for(var e in scopeStorage.userData){
                    if(scopeStorage.userData[e].id != id){
                        res.push(scopeStorage.userData[e]);
                    }
                }
                scopeStorage.userData = res;
                actionOk = true;
            }
            if( ! actionOk)
            MessageFactory.set_alert('error');
        }
        /**
        * public set_deleteTeam
        *
        * @description valided team not in a active game and if ok delete
        * @returns boolean if team in a active game than false
        */
        function set_deleteTeam(id) {
            var res = [];
            var actionOk = false;
            if(get_checkTeamIsInActiveGame(id)){
                MessageFactory.set_error("team_is_in_active_game");
            }else{
                for(var e in scopeStorage.teamData){
                    if(scopeStorage.teamData[e].id != id){
                        res.push(scopeStorage.teamData[e]);
                    }
                }
                actionOk = true;
            }
            if(actionOk && MessageFactory.get_confirm("team_delete")){
                scopeStorage.teamData = res;
            }

            if( ! actionOk)
            MessageFactory.set_alert('error');
        }
        /**
        * public set_deleteGame
        *
        * @description
        * @returns boolean
        */
        var set_deleteGame = function (id) {
            var res = [];
            for(var e in scopeStorage.gameData){
                if(scopeStorage.gameData[e].id != id){
                    res.push(scopeStorage.gameData[e]);
                }
            }
            scopeStorage.gameData = res;
            set_gameScoreList();
            //set_gridOptions();
            return true;
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
            scopeStorage.gameScoreData = [];
            if(scopeStorage.gameData.length){
                for(var e in scopeStorage.gameData){
                    teamid_1 = get_teamid(scopeStorage.gameData[e].team_1);
                    teamid_2 = get_teamid(scopeStorage.gameData[e].team_2);
                    // SET FIRST TEAM
                    if(typeof list[teamid_1] !== 'undefined'){
                        list[teamid_1].gamecounts += 1;
                    }else if(typeof list[teamid_1] === 'undefined'){
                        list[teamid_1] = {teamname: scopeStorage.gameData[e].team_1, gamecounts: 1, totalpoints: 0};
                    }
                    if(scopeStorage.gameData[e].team_1===scopeStorage.gameData[e].team_win){
                        list[teamid_1].totalpoints += 1;
                    }
                    // SET SECOND TEAM
                    if(typeof list[teamid_2] !== 'undefined'){
                        list[teamid_2].gamecounts += 1;
                    }else if(typeof list[teamid_2] === 'undefined'){
                        list[teamid_2] = {teamname: scopeStorage.gameData[e].team_2, gamecounts: 1, totalpoints: 0};
                    }
                    if(scopeStorage.gameData[e].team_2===scopeStorage.gameData[e].team_win){
                        list[teamid_2].totalpoints += 1;
                    }

                }
                for(var n in list){
                    scopeStorage.gameScoreData.push(list[n]);
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
            if(scopeStorage.activeDirectiveId !== "" && scopeStorage.gameIsRunning === true){
                var teamnumber = scopeStorage.activeDirectiveId*1+1;
                var goalid = obj.goal_index*1;
                var teamscore = scopeStorage.gameActualTeamData["team_"+teamnumber+"_scores"]*1;
                var goalval = scopeStorage.goalsItemConf[goalid].val*1;
                var gameHasWinner = false;
                if(teamscore+1 === goalval){
                    scopeStorage.gameActualTeamData["team_"+teamnumber+"_scores"] = goalval;
                    set_gameScoreDisplayStyle(domelement,true);
                    if(goalval===scopeStorage.goalsItemConf.length){
                       gameHasWinner = true;
                    }
                }else if(teamscore === goalval){
                    scopeStorage.gameActualTeamData["team_"+teamnumber+"_scores"] -= 1;
                    set_gameScoreDisplayStyle(domelement,false);
                }

                if(gameHasWinner){
                    if(MessageFactory.get_confirm("game_has_winner",scopeStorage.gameActualTeamData["team_"+teamnumber])){
                        set_gameWinner();
                    }else{
                        scopeStorage.gameActualTeamData["team_"+teamnumber+"_scores"] -= 1;
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
                team_win:(scopeStorage.gameActualTeamData.team_1_scores>scopeStorage.gameActualTeamData.team_2_scores)? scopeStorage.gameActualTeamData.team_1:scopeStorage.gameActualTeamData.team_2,
                team_1: scopeStorage.gameActualTeamData.team_1,
                team_2: scopeStorage.gameActualTeamData.team_2,
                result: scopeStorage.gameActualTeamData.team_1_scores+' : '+scopeStorage.gameActualTeamData.team_2_scores,
                id: scopeStorage.gameAutoId()
            }
            scopeStorage.gameData.push(gamelist_arg);
            set_defaultGameActualTeamData();
            set_gameScoreList();
            set_gameScoreDisplayStyle("",false);
            scopeStorage.gameIsRunning = false;
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
            for( var n in scopeStorage.gameData){
                if(teams.indexOf(scopeStorage.gameData[n].team_1) !== -1  && teams.indexOf(scopeStorage.gameData[n].team_2) !== -1 ){
                    gamedata_new.push(scopeStorage.gameData[n]);
                }
            }
            if(gamedata_new.length < scopeStorage.gameData.length){
                scopeStorage.gameData = gamedata_new;
                set_gameScoreList();
            }
        }
        /**
        * public set_showTabWrapper
        *
        * @description set click event box-label
        * @returns void
        */
        function set_showTabWrapper($event){
            var id = angular.element("body div.box-label").index($event.target);
            var boxid = angular.element($event.target).attr("data-boxid");
            var wrapper = angular.element("body div.wrapper-box:eq("+id+")");
            var show = (wrapper.hasClass('active')) ? wrapper.removeClass('active'):wrapper.addClass('active');
            scopeStorage.wrapperstatus[boxid] = (wrapper.hasClass('active')) ? 1:0;
        }
        /**
        * private set_scopeWatcher
        *
        * @description set scope watcher
        * @returns void
        */
        var set_scopeWatcher = function(){
            scopeStorage.$watch('teamData',
                function(){
                    set_gameDataHasTeamCeck();
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
            scopeStorage.userAutoId = get_funcautoId("user");
            scopeStorage.teamAutoId = get_funcautoId("team");
            scopeStorage.gameAutoId = get_funcautoId("game");
            set_defaultGameActualTeamData();
            set_gameScoreList();
            set_gridOptions('user');
            set_gridOptions('team');
            set_gridOptions('game');
            set_scopeWatcher();
        }
        return {
            set_initialze: set_initialze,
            set_startGame: set_startGame,
            set_addUser: set_addUser,
            set_addTeam: set_addTeam,
            set_deleteGame: set_deleteGame,
            set_deleteUser: set_deleteUser,
            set_deleteTeam: set_deleteTeam,
            set_gameActualTeamData: set_gameActualTeamData,
            set_showTabWrapper: set_showTabWrapper
        }
    }
    
})()
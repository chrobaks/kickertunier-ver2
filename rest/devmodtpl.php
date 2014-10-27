<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Kickertunier REST API</title>
<style>
* {font-size: 9px;}
.header td, form span {font-weight: bold;}
input.number {width: 50px;}
.menu a {float: left;padding-right: 10px;}
.menu span.last {clear: left;padding: 0px;margin: 0px;}
</style>
</head>
<body>
    <p class="menu">
        <a href="request.php?devmd=1&tbl=users&act=get">get users</a>
        <a href="request.php?devmd=1&tbl=teams&act=get">get teams</a>
        <a href="request.php?devmd=1&tbl=games&act=get">get games</a>
        <a href="request.php?devmd=1&tbl=scorelist&act=get">get scorelist</a>
        <span class="last">&nbsp;</span>
    </p>
    <fieldset><legend>RESPONSE</legend><?php print($_RH->response());?></fieldset>
    <div>
        <p><strong>USER</strong></p>
        <form action="request.php" method="get" name="formAddUsers">
        <input type="hidden" name="tbl" value="users" />
        <input type="hidden" name="act" value="add" />
        <input type="hidden" name="devmd" value="1" />
        <input type="text" name="firstname" />&nbsp;<span>firstname</span><br />
        <input type="text" name="secondname" />&nbsp;<span>secondname</span><br />
        <input type="text" name="nickname" />&nbsp;<span>nickname</span><br />
        <input type="submit" value="add user" /><br />
        </form>
        <?php if( ! empty($data["users"])): ?>
        <table>
            <tr class="header">
            <?php print("<td>".implode("</td><td>",array_keys($data["users"][0]))."</td>");?>
            <td colspan="2"></td>
            </tr>
            <?php foreach($data["users"] as $k=>$v): ?>
            <tr>
                <form action="request.php" method="get" name="formUsers<?php print($k);?>">
                <td><input type="hidden" name="tbl" value="users" />
                <input type="hidden" name="act" value="" />
                <input type="hidden" name="devmd" value="1" />
                <input type="text" class="number" name="id" value="<?php print($v["id"]);?>" /></td>
                <td><input type="text" name="firstname" value="<?php print($v["firstname"]);?>" /></td>
                <td><input type="text" name="secondname" value="<?php print($v["secondname"]);?>" /></td>
                <td><input type="text" name="nickname" value="<?php print($v["nickname"]);?>" /></td>
                <td><input type="button" value="edit" onclick="formUsers<?php print($k);?>.act.value='upd';formUsers<?php print($k);?>.submit();" /></td>
                <td><input type="button" value="delete"  onclick="formUsers<?php print($k);?>.act.value='del';formUsers<?php print($k);?>.submit();"/></td>
                </form>
            </tr>
            <?php endforeach; ?>
        </table>
        <?php endif; ?>
    </div>
    <div>
        <p><strong>TEAMS</strong></p>
        <form action="request.php" method="get" name="formAddTeams">
        <input type="hidden" name="tbl" value="teams" />
        <input type="hidden" name="act" value="add" />
        <input type="hidden" name="devmd" value="1" />
        <select name="player_1">
            <option value="">Player 1</option>
            <?php foreach($data["users"] as $k=>$v): ?>
            <option value="<?php print($v["id"]);?>"><?php print($v["nickname"]);?></option>
            <?php endforeach; ?>
        </select>&nbsp;<span>player 1</span><br />
        <select name="player_2">
            <option value="">Player 2</option>
            <?php foreach($data["users"] as $k=>$v): ?>
            <option value="<?php print($v["id"]);?>"><?php print($v["nickname"]);?></option>
            <?php endforeach; ?>
        </select>&nbsp;<span>player 2</span><br />
        <input type="text" name="teamname" />&nbsp;<span>teamname</span><br />
        <input type="submit" value="add team" /><br />
        </form>
        <?php if( ! empty($data["teams"])): ?>
        <table>
            <tr class="header">
            <?php print("<td>".implode("</td><td>",array_keys($data["teams"][0]))."</td>");?>
            <td colspan="2"></td>
            </tr>
            <?php foreach($data["teams"] as $k=>$v): ?>
            <tr>
                <form action="request.php" method="get" name="formTeams<?php print($k);?>">
                <td>
                    <input type="hidden" name="tbl" value="teams" />
                    <input type="hidden" name="act" value="" />
                    <input type="hidden" name="devmd" value="1" />
                    <input type="text" class="number" name="id" value="<?php print($v["id"]);?>" />
                </td>
                <td><input type="text" name="player_1" value="<?php print($v["player_1"]);?>" /></td>
                <td><input type="text" name="player_2" value="<?php print($v["player_2"]);?>" /></td>
                <td><input type="text" name="teamname" value="<?php print($v["teamname"]);?>" /></td>
                <td><input type="button" value="edit" onclick="formTeams<?php print($k);?>.act.value='upd';formTeams<?php print($k);?>.submit();" /></td>
                <td><input type="button" value="delete"  onclick="formTeams<?php print($k);?>.act.value='del';formeams<?php print($k);?>.submit();"/></td>
                </form>
            </tr>
            <?php endforeach; ?>
        </table>
        <?php endif; ?>
    </div>
    <div>
        <p><strong>GAMES</strong></p>
        <form action="request.php" method="get" name="formAddGames">
        <input type="hidden" name="tbl" value="games" />
        <input type="hidden" name="act" value="add" />
        <input type="hidden" name="devmd" value="1" />
        <select name="team_1">
            <option value="">Team 1</option>
            <?php foreach($data["teams"] as $k=>$v): ?>
            <option value="<?php print($v["id"]);?>"><?php print($v["teamname"]);?></option>
            <?php endforeach; ?>
        </select>&nbsp;<span>team 1</span><br />
        <select name="team_2">
            <option value="">Team 2</option>
            <?php foreach($data["teams"] as $k=>$v): ?>
            <option value="<?php print($v["id"]);?>"><?php print($v["teamname"]);?></option>
            <?php endforeach; ?>
        </select>&nbsp;<span>team 2</span><br />
        <input type="text" name="result" onblur="this.value=this.value.replace(/\s/g,'');if(this.value.split('/').length>1){formAddGames.winner_id.value = (this.value.split('/')[0]*1<this.value.split('/')[1]*1)? formAddGames.team_2.value:formAddGames.team_1.value;}" />&nbsp;<span>result</span><br />
        <input type="text" name="winner_id" />&nbsp;<span>winner_id</span><br />
        <input type="submit" value="add game" /><br />
        </form>
        <?php if( ! empty($data["games"])): ?>
        <table>
            <tr class="header">
            <?php print("<td>".implode("</td><td>",array_keys($data["games"][0]))."</td>");?>
            <td colspan="2"></td>
            </tr>
            <?php foreach($data["games"] as $k=>$v): ?>
            <tr>
                <form action="request.php" method="get" name="formGames<?php print($k);?>">
                <td><input type="hidden" name="tbl" value="games" />
                <input type="hidden" name="act" value="" />
                <input type="hidden" name="devmd" value="1" />
                <input type="text" class="number" name="id" value="<?php print($v["id"]);?>" /></td>
                <td><input type="text" name="team_1" value="<?php print($v["team_1"]);?>" /></td>
                <td><input type="text" name="team_2" value="<?php print($v["team_2"]);?>" /></td>
                <td><input type="text" name="result" value="<?php print($v["result"]);?>" /></td>
                <td><input type="text" name="winner_id" value="<?php print($v["winner_id"]);?>" /></td>
                <td><input type="button" value="edit" onclick="formGames<?php print($k);?>.act.value='upd';formGames<?php print($k);?>.submit();" /></td>
                <td><input type="button" value="delete" onclick="formGames<?php print($k);?>.act.value='del';formGames<?php print($k);?>.submit();"/></td>
                </form>
            </tr>
            <?php endforeach; ?>
        </table>
        <?php endif; ?>
    </div>
    <?php if( ! empty($data["scorelist"])): ?>
    <div>
        <p><strong>SCORELIST</strong></p>
        <table>
            <tr class="header">
            <?php print("<td>".implode("</td><td>",array_keys($data["scorelist"][0]))."</td>");?>
            </tr>
            <?php foreach($data["scorelist"] as $k=>$v): ?>
            <tr>
                <td><input type="text" class="number" name="id" value="<?php print($v["id"]);?>" /></td>
                <td><input type="text" name="teamname" value="<?php print($v["teamname"]);?>" /></td>
                <td><input type="text" name="totalpoints" value="<?php print($v["totalpoints"]);?>" /></td>
                <td><input type="text" name="gamecounts" value="<?php print($v["gamecounts"]);?>" /></td>
            </tr>
            <?php endforeach; ?>
        </table>
        
    </div>
    <?php else: ?>
    no games
    <?php endif; ?>
</body>
</html>

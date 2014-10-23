<?php
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*# DB CLASS INCLUDE
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
require_once('db.php');
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*# DB CLASS INCLUDE
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
require_once('rest.php');
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
* INSTANCE OF CLASS DBHANDLER
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
$_RH = RestHandler::get_instance($config_rest);
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
* INIT REST WITH GET PARAM
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
$_RH->init($_GET);
$data = $_RH->data();
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Seitentitel</title>
</head>
<body>
<p><a href="request.php?tbl=users&act=get">get</a></p>
<table>
<tr>
<?php print("<td><strong>".implode("</strong></td><td><strong>",array_keys($data[0]))."</strong></td>");?>
</tr>
<?php foreach($data as $k=>$v): ?>
<tr>
<?php print("<td>".implode("</td><td>",array_values($v))."</td>"); ?>
</tr>
<?php endforeach; ?>
</table>
<p><a href='request.php?tbl=users&act=add&firstname=cbcbcbcb&secondname=rtzrzrzrz&nickname="dfgdgdgd"'>add user</a></p>
<p><a href='request.php?tbl=users&act=upd&id=60&nickname=HurtigHugo'>updated user</a></p>
<p><a href='request.php?tbl=users&act=del&id=61'>delete user</a></p>
</body>
</html>

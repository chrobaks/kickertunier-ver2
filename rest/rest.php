<?php
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*# DB CLASS INCLUDE
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
require_once('db.php');
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
* INSTANCE OF CLASS DBHANDLER
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
$_DB = DbHandler::get_instance();
$_DB->execute("/*!40101 SET NAMES 'UTF8' */");
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
* CONFIG REST
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
$config_rest = array(
    "tbl" =>  array("users", "teams", "games"),
    "act" =>  array("add", "upd", "del", "get"),
    "add" =>  array(
        "users" => array("firstname", "secondname", "nickname"),
        "teams" => array("player_1", "player_2", "teamname"),
        "games" => array("team_1", "team_2", "result", "winner_id")
    ),
    "upd" =>  array("id", "firstname", "secondname", "nickname"),
    "del" =>  array("id"),
    "get" =>  array("id", "")
);
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
* PARAM SETTINGS REST 
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
$settings_rest = array();
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
* ACTION SETTINGS REST 
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
if(is_array($_GET) && ! empty($_GET)){
   $settings_rest["tbl"] = (isset($_GET["tbl"]) && in_array($_GET["tbl"],$config_rest["tbl"])) ? $_GET["tbl"] : null;
   $settings_rest["act"] = (isset($_GET["act"]) && in_array($_GET["act"],$config_rest["act"])) ? $_GET["act"] : null;
}
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
* ACTION VALUES SETTINGS REST 
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
$query = "";
if(isset($settings_rest["tbl"]) && isset($settings_rest["act"])){
    switch($settings_rest["act"]){
        case("add"):
            $query = "";
        break;
        case("upd"):
        
        break;
        case("del"):
        
        break;
        case("get"):
            $query = "SELECT DISTINCT * FROM ".$settings_rest["tbl"]." ORDER BY secondname, firstname";
        break;
    }
}
?>

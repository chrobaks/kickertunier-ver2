<?php
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*# RESTHANDLER CLASS INCLUDE
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
require_once('restconfig.php');
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*# RESTHANDLER CLASS INCLUDE
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
require_once('rest.php');
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
* INSTANCE OF CLASS RESTHANDLER
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
$_RH = RestHandler::get_instance($config_rest);
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
* INIT REST WITH GET PARAM
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/

$doc    = explode(str_replace(__DIR__.DIRECTORY_SEPARATOR,'',__FILE__)."/",$_SERVER['REQUEST_URI']);
$params = explode("/",$doc[1]);

$_RH->init($params);
print($_RH->response());



<?php
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
    "upd" =>  array(
        "users" => array("id", "firstname", "secondname", "nickname"),
        "teams" => array("id", "player_1", "player_2", "teamname"),
        "games" => array("id", "team_1", "team_2", "result", "winner_id")
    ),
    "del" =>  array(
        "users" => array("id"),
        "teams" => array("id"),
        "games" => array("id")
    ),
    "get" =>  array("id", "")
);
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*# CLASS RestHandler
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
class RestHandler {
	public static $instance;
	private $config;
	private $setttings;
	private $params;
	private $db;
	public function __construct($config) { 
        $this->config = $config;
        $this->setttings = array();
        $this->params = array();
        $this->db = DbHandler::get_instance();
        $this->db->execute("/*!40101 SET NAMES 'UTF8' */");
	}
	public static function get_instance($config){
		if( ! isset(self::$instance)){self::$instance = new RestHandler($config);}
		return self::$instance;
	}
    public function init ($param) {
        $func = "";
        if($this->settings["tbl"]=(isset($param["tbl"]) && in_array($param["tbl"],$this->config["tbl"])) ? $param["tbl"] : null){
            if($func = (isset($param["act"]) && in_array($param["act"],$this->config["act"])) ? $param["act"] : null){
                foreach($param as $k => $v){
                    if($k!="tbl" && $k!="act" ){
                        $this->params[$k] = $v;
                    }
                }
                $this->$func();
            }
        }
    }
    private function del () {
        if($this->db->execute("DELETE FROM ".$this->settings["tbl"]." WHERE id =".$this->params["id"])){
            $this->get();
        }
    }
    private function upd () {
        
        $dbval = $this->escape(array_values($this->params));
        $updcol = array_filter(array_map("self::updcol", array_keys($this->params), $dbval));
        $query = sprintf("UPDATE ".$this->settings["tbl"]." SET %s WHERE id='%s'", implode(', ',$updcol), $this->params["id"]);
        
        if($this->db->execute($query)){
            //$this->get();
        }
    }
    private function add () {
        
        $dbval = $this->escape(array_values($this->params));
        $query = sprintf('INSERT INTO '.$this->settings["tbl"].' (%s) VALUES ("%s")', implode(', ',array_keys($this->params)), implode('"," ',$dbval));
        
        if($this->db->execute($query, true)){
            //$this->get();
        }
    }
    private function get () {
        return $this->db->getList($this->settings["tbl"],"");
    }
    private function updcol($key, $val) {
        if($key!="id"){
            return $key."='".$val."'";
        }
    }
    private function escape($val) {
        return array_map(create_function('$e', 'return mysql_real_escape_string(((get_magic_quotes_gpc()) ? stripslashes($e) : $e));'), $val);
    }
    public function data() {
        return $this->get();
    }
}
?>
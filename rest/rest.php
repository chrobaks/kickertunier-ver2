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
    "get" =>  array(
        "users" => array("id"),
        "teams" => array("id"),
        "games" => array("id")
    )
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
    private $response;
	public function __construct($config) { 
        $this->db = DbHandler::get_instance();
        $this->db->execute("/*!40101 SET NAMES 'UTF8' */");
        $this->config = $config;
        $this->setttings = array();
        $this->params = array();
        $this->response = '{"status":"error"}';
	}
	public static function get_instance($config){
		if( ! isset(self::$instance)){self::$instance = new RestHandler($config);}
		return self::$instance;
	}
    public function init ($param) {
        $func = "";
        if($this->settings["tbl"]=(isset($param["tbl"]) && in_array($param["tbl"],$this->config["tbl"])) ? $param["tbl"] : null){
            if($func = (isset($param["act"]) && in_array($param["act"],$this->config["act"])) ? $param["act"] : null){
                $this->settings["act"]=$param["act"];
                foreach($param as $k => $v){
                    if($k!="tbl" && $k!="act" && in_array($k, $this->config[$this->settings["act"]][$this->settings["tbl"]])){
                        $this->params[$k] = $v;
                    }
                }
                if( ! empty($this->params) || empty($this->params) && $this->settings["act"]=='get')
                $this->$func();
            }
        }
    }
    private function del () {
        if($this->db->execute("DELETE FROM ".$this->settings["tbl"]." WHERE id =".$this->params["id"])){
            $this->response = '{"status":"succes"}';
        }
    }
    private function upd () {
        $dbval = $this->escape(array_values($this->params));
        $updcol = array_filter(array_map("self::updcol", array_keys($this->params), $dbval));
        $query = sprintf("UPDATE ".$this->settings["tbl"]." SET %s WHERE id='%s'", implode(', ',$updcol), $this->params["id"]);
        if($this->db->execute($query)){
            $this->response = '{"status":"succes"}';
        }
    }
    private function add () {
        $dbval = $this->escape(array_values($this->params));
        $query = sprintf('INSERT INTO '.$this->settings["tbl"].' (%s) VALUES ("%s")', implode(', ',array_keys($this->params)), implode('"," ',$dbval));
        if($this->db->execute($query, true)){
            $this->response = '{"status":"succes","insertid":"'.$this->db->getLastInsertId().'"}';
        }
    }
    private function get () {
        $r = $this->db->getList($this->settings["tbl"], "", ((isset($this->params["id"])) ? array("id"=>$this->params["id"]):array()));
        $this->response = '{"status":"succes","list":'.json_encode($r).'}';
    }
    private function devget () {
        return $this->db->getList($this->settings["tbl"], "", ((isset($this->params["id"])) ? array("id"=>$this->params["id"]):array()));
    }
    private function updcol($key, $val) {
        if($key!="id"){ return $key."='".$val."'"; }
    }
    private function escape($val) {
        return array_map(create_function('$e', 'return mysql_real_escape_string(((get_magic_quotes_gpc()) ? stripslashes($e) : $e));'), $val);
    }
    public function response() {
        return $this->response;
    }
    public function devdata() {
        $this->params = array();
        $res = array();
        $this->settings["tbl"] = "users";
        $this->settings["act"] = "get";
        $res["users"] = $this->devget();
        $this->settings["tbl"] = "teams";
        $this->settings["act"] = "get";
        $res["teams"] = $this->devget();
        $this->settings["tbl"] = "games";
        $this->settings["act"] = "get";
        $res["games"] = $this->devget();
        return $res;
    }
}
?>
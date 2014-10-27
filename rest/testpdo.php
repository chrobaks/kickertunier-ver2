<?php
define("DB_HOST","localhost");
define("DB_USER","root");
define("DB_PASS","st03ch05");
define("DB_DATABASE","kickertunier");

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

class RestHandler  extends DB
{
    public static $instance;
    private $config;
    private $setttings;
    private $params;
    private $db;
    private $response;
    private $lastinsertid;
    public function __construct($config) {
        parent::__construct();
        $this->lastinsertid = 0;
        $this->config = $config;
        $this->setttings = array();
        $this->params = array();
        $this->response = '{"status":"error"}';
        $stmt = $this->handler->prepare("/*!40101 SET NAMES 'UTF8' */");
        $stmt->execute();
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
        if($this->handler->exec("DELETE FROM ".$this->settings["tbl"]." WHERE id =".$this->params["id"])){
            $this->response = '{"status":"success"}';
        }
    }
    private function upd () {
        $updcol = array_filter(array_map("self::updcol", array_keys($this->params),array_values($this->params)));
        $query = sprintf("UPDATE ".$this->settings["tbl"]." SET %s WHERE id='%s'", implode(', ',$updcol), $this->params["id"]);
        $affected_rows = $this->handler->exec($query);
        if($affected_rows){
            $this->response = '{"status":"success"}';
        }
    }
    private function add () {
        $query = sprintf('INSERT INTO '.$this->settings["tbl"].' (%s) VALUES ("%s")', implode(', ',array_keys($this->params)), implode('"," ',array_values($this->params)));
        if($this->handler->exec($query)){
            $this->response = '{"status":"success","insertid":"'.$this->handler->lastInsertId().'"}';
        }
    }
    private function get () {
        if(isset($this->params["id"])){
            $stmt = $this->handler->prepare("SELECT * FROM ".$this->settings["tbl"]." WHERE id= :id");
            $stmt->execute($this->params);
        }else{
            $stmt = $this->handler->prepare("SELECT * FROM ".$this->settings["tbl"]);
            $stmt->execute();
        }
        $result = $stmt->fetchAll();
        $this->response = '{"status":"success","list":'.json_encode($result).'}';
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
$_RH = RestHandler::get_instance($config_rest);
$_RH->init($_GET);
print($_RH->response());
?>
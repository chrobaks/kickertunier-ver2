<?php
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
* CONFIG DB
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
define("DB_HOST","localhost");
define("DB_USER","root");
define("DB_PASS","");
define("DB_DATABASE","kickertunier");
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
* CONFIG REST
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
$config_rest = array(
    "tbl" =>  array("users", "teams", "games", "scorelist"),
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
        "games" => array("id"),
        "scorelist" => array("id")
    )
);
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*# CLASS DB
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
class DB 
{
    protected $dbhandler;
	public function __construct(){
		$this->dbhandler = new PDO('mysql:host='.DB_HOST.';dbname='.DB_DATABASE.';charset=UTF-8', DB_USER, DB_PASS);
    }
}
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*# CLASS RestHandler
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
class RestHandler extends DB
{
    public static $instance;
    private $config;
    private $setttings;
    private $params;
    private $response;
    public function __construct($config) {
        parent::__construct();
        $this->config    = $config;
        $this->setttings = array();
        $this->params    = array();
        $this->response  = '{"status":"error"}';
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
        if($this->dbhandler->exec("DELETE FROM ".$this->settings["tbl"]." WHERE id =".$this->params["id"])){
            $this->dbhandler->exec("FLUSH TABLES");
            $this->response = '{"status":"success"}';
        }
    }
    private function upd () {
        $updcol = array_filter(array_map("self::updcol", array_keys($this->params),array_values($this->params)));
        $query = sprintf("UPDATE ".$this->settings["tbl"]." SET %s WHERE id='%s'", implode(', ',$updcol), $this->params["id"]);
        if($this->dbhandler->exec($query)){
            $this->dbhandler->exec("FLUSH TABLES");
            $this->response = '{"status":"success"}';
        }
    }
    private function add () {
        $query = sprintf('INSERT INTO '.$this->settings["tbl"].' (%s) VALUES ("%s")', implode(', ',array_keys($this->params)), implode('"," ',array_values($this->params)));
        if($this->dbhandler->exec($query)){
            $this->response = '{"status":"success","insertid":"'.$this->dbhandler->lastInsertId().'"}';
            $this->dbhandler->exec("FLUSH TABLES");
        }
    }
    private function queryScorelist () {
        return "SELECT teams.id, teams.teamname,
                (SELECT count(id) FROM games WHERE winner_id=teams.id) as totalpoints,
                (SELECT count(id) FROM games WHERE team_1=teams.id OR team_2=teams.id ) as gamecounts
                FROM teams 
                ORDER BY totalpoints DESC, gamecounts ASC ";
    }
    private function get () {
        if($this->settings["tbl"] !== 'scorelist'){
            if(isset($this->params["id"])){
                $stmt = $this->dbhandler->prepare("SELECT * FROM ".$this->settings["tbl"]." WHERE id= :id");
                $stmt->execute($this->params);
            }else{
                $stmt = $this->dbhandler->prepare("SELECT * FROM ".$this->settings["tbl"]);
                $stmt->execute();
            }
        }else{
            $stmt = $this->dbhandler->prepare($this->queryScorelist());
            $stmt->execute();
        }
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $this->response = '{"status":"success","list":'.json_encode($result).'}';
    }
    private function updcol($key, $val) {
        if($key!="id"){ return $key."='".$val."'"; }
    }
    public function response() {
        return $this->response;
    }
    // ONLY DEVMOD
    private function devget () {
        if($this->settings["tbl"] !== 'scorelist'){
            $stmt = $this->dbhandler->prepare("SELECT * FROM ".$this->settings["tbl"]);
        }else{
            $stmt = $this->dbhandler->prepare($this->queryScorelist());
        }
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function devdata() {
        $this->params = array();
        $res = array();
        $this->settings["act"] = "get";
        foreach($this->config["tbl"] as $tbl){
            $this->settings["tbl"] = $tbl;
            $res[$tbl] = $this->devget();
        }
        return $res;
    }
}

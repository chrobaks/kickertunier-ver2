<?php
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*# CLASS DB
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
class DB 
{
    protected $dbhandler;
	public function __construct(){
		$this->dbhandler = new PDO('mysql:host='.DB_HOST.';dbname='.DB_DATABASE.';', DB_USER, DB_PASS, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
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
    public function init ($request) {
        $this->requestaction($request);
        if($this->settings["tbl"] && $this->settings["act"]){
            $func = $this->settings["act"];
            $this->$func();
        }else{$this->response  = '{"status":"error","msg":"settings"}';}
    }
    private function requestaction ($request) {
        switch($_SERVER['REQUEST_METHOD']){
            case('GET'):
                $this->settings["act"] = 'get';
            break;
            case('PUT'):
                $this->settings["act"] = 'add';
                $this->params = json_decode(file_get_contents('php://input'),true);
            break;
            case('DELETE'):
                $this->settings["act"] = 'del';
                $this->params["id"] = $request[1];
            break;
        }
        if(count($request)>0){
            $this->settings["tbl"] = ( in_array($request[0],$this->config["tbl"])) ? $request[0] : null;
        }
    }
    private function del () {
        if($this->dbhandler->exec("DELETE FROM ".$this->settings["tbl"]." WHERE id =".$this->params["id"])){
            if($this->settings["tbl"]=='teams'){
                $this->dbhandler->exec("DELETE FROM games WHERE team_1 =".$this->params["id"]." OR team_2 =".$this->params["id"]);
            }
            $this->dbhandler->exec("FLUSH TABLES");
            $this->response = '{"status":"success"}';
        }else{
            //$this->response = '{"status":"error", "msg":"'.$this->params["id"].'"}';
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
        if( ! empty($this->params)){
            $query = sprintf('INSERT INTO '.$this->settings["tbl"].' (%s) VALUES ("%s")', implode(',',array_keys($this->params)), implode('","',array_values($this->params)));
            if($this->dbhandler->exec($query)){
                $this->params["id"] = $this->dbhandler->lastInsertId();
                $this->response = json_encode($this->params);
                $this->dbhandler->exec("FLUSH TABLES");
            }
        }
    }
    private function get () {
        if($this->settings["tbl"] !== 'scorelist'){
            $stmt = $this->dbhandler->prepare($this->queryGet());
            if(isset($this->params["id"])){
                $stmt->execute($this->params);
            }else{
                $stmt->execute();
            }
        }else{
            $stmt = $this->dbhandler->prepare($this->queryScorelist());
            $stmt->execute();
        }
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $this->response = json_encode($result);
    }
    private function queryScorelist () {
        return "SELECT teams.id, teams.teamname,
                (SELECT count(id) FROM games WHERE winner_id=teams.id) as totalpoints,
                (SELECT count(id) FROM games WHERE team_1=teams.id OR team_2=teams.id ) as gamecounts
                FROM teams 
                ORDER BY totalpoints DESC, gamecounts ASC ";
    }
    private function queryGet () {
        $query = "";
        $where = (isset($this->params["id"])) ? " WHERE id= :id" : "";
        if($this->settings["tbl"] == 'teams'){
            $query = "SELECT ".$this->settings["tbl"].".* ,
            (SELECT nickname FROM users WHERE users.id=".$this->settings["tbl"].".player_1 LIMIT 1) AS nickname_1,
            (SELECT nickname FROM users WHERE users.id=".$this->settings["tbl"].".player_2 LIMIT 1) AS nickname_2
            FROM ".$this->settings["tbl"].$where;
        }elseif($this->settings["tbl"] == 'games'){
            $query = "SELECT ".$this->settings["tbl"].".* ,
            (SELECT teamname FROM teams WHERE teams.id=".$this->settings["tbl"].".team_1 LIMIT 1) AS teamname_1,
            (SELECT teamname FROM teams WHERE teams.id=".$this->settings["tbl"].".team_2 LIMIT 1) AS teamname_2
            FROM ".$this->settings["tbl"].$where;
        }else{
            $query = "SELECT * FROM ".$this->settings["tbl"].$where;
        }
        return $query;
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

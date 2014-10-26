<?php
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*# DB DEFINES
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
define("DB_HOST","localhost");
define("DB_USER","root");
define("DB_PASS","");
define("DB_DATABASE","kickertunier");
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*# DB CLASS
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
class DB {
	private $host;
	private $user;
	private $pass;
	private $database;
	private $connect;
	public $queryLen;
	public $queryFieldMeta;
	public function __construct(){
		$this->host = DB_HOST;
		$this->user = DB_USER;
		$this->pass = DB_PASS;
		$this->database = DB_DATABASE;
		$this->queryLen = 0;
		$this->queryFieldMeta = array();
	}
	protected function getDbConnect(){ return @mysql_connect($this->host, $this->user , $this->pass ); }
	protected function getBoolDbSelect(){ return (@mysql_select_db($this->database , $this->getDbConnect() )) ? true : false; }
}
/*
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*# DBHANDLER CLASS
*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
class DbHandler extends DB {
	public static $instance;
    private $lastinsertid;
	public function __construct() { 
		parent::__construct();
        $this->lastinsertid=0;
	}
	public static function get_instance(){
		if( ! isset(self::$instance)){self::$instance = new DbHandler();}
		return self::$instance;
	}
	public function execute($sql="",$setlastinsertid=false){
		if(DbHandler::getBoolDbSelect() && $sql != ""){
			if(@mysql_query($sql,$this->getDbConnect())){
				if($setlastinsertid){
				    $this->lastinsertid=mysql_insert_id();
				}
                @mysql_query("FLUSH TABLES");
				return true;
			}else{
			//ERRORHANDLING print(mysql_error());
			}
		}else{
			//ERRORHANDLING
		}
		return false;
	}
    public function getLastInsertId(){return $this->lastinsertid;}
	public function getList($table,$cols="",$where=array(),$option="",$setLimit=0,$distinct=0){
		$k = ($cols!="") ? $cols : "*";
		$limit = ($setLimit > 0) ? " LIMIT ".$setLimit : "";
		$values = "";
		$result = "";
		$sqlDistnct = ($distinct==1) ? " DISTINCT " : "";
		if(is_array($where) && count($where) > 0){
			if(count($where) == 1){
				$col = array_keys($where);
				$val = $where[$col[0]];
				$values = " WHERE ".$col[0]."='".$val."'";
			}else if(count($where) > 1){
				$values = array();
				foreach($where as $ky => $v){$values[] = $ky."='".$v."'";}
				$values = " WHERE ".implode(" AND ",$values);
			}
		}
		$sql = $this->getQueryArray("SELECT".$sqlDistnct." ".$k." FROM ".$table."".$values." ".$option."".$limit);
		if($this->queryLen > 0) {
			if($this->queryLen == 1 && $setLimit!=1){
				$result = array($sql);
			}else{
				$result = $sql;
			}
		}
		return $result;
	}
	public function getQueryArray($sql){
		$result = "";
		if($arr = $this->getQuery($sql) ){
			$result;
			$arrCopy = array();
			if($this->queryLen > 0){
				$result = array();
				while ($row = mysql_fetch_assoc($arr)) {
					foreach($row as $k => $v) { $arrCopy[$k] =  trim($v); }
					if($this->queryLen > 1){
						$result[count($result)] = $arrCopy;
						$arrCopy = array();
					}else{
						$result = $arrCopy;
					}
				}
			}
		}else{
			//ERRORHANDLING
		}
		@mysql_free_result($arr);
		return $result;
	}
	private function getQuery($sql){
		$this->queryLen = 0;
		if(  $this->getBoolDbSelect() && ! empty( $sql ) ){
			if($result = @mysql_query( $sql , $this->getDbConnect() )){
				$this->queryLen = @mysql_num_rows($result);
				$this->queryLen = ($this->queryLen != "") ? $this->queryLen : 0;
				return $result;
			}
		}else{
			//ERRORHANDLING
		}
		return "";
	}
}
?>

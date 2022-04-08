<?php

/*
 *
 * FUNKCIÓK
 * 
 */

function getAll($db){
    /*
     * https://www.php.net/manual/en/sqlite3.query.php
     */
    $result = $db->query('SELECT id, szoveg FROM tennivalok');
    
    $rows = array();
    while( $row = $result->fetchArray()){
        $row_tidy = array();
        $row_tidy['id'] = $row['id'];
        $row_tidy['szoveg'] = $row['szoveg'];
        
        array_push($rows,$row_tidy);
    }
    return $rows;
}

/*
 *
 * FŐPROGRAM
 *
 */ 

$db = new SQLite3('adatbazis.db');
$db->exec('CREATE TABLE IF NOT EXISTS tennivalok(id INTEGER PRIMARY KEY AUTOINCREMENT, szoveg TEXT)');

$response = array();
if($_GET['action']=='getall'){
    
    $response['lista'] = getAll($db);

}elseif(isset($_GET['insert'])){
    $szoveg = $_GET['insert'];

    $db->exec("INSERT INTO tennivalok (szoveg) VALUES ('$szoveg')");

    $response['lista'] = getAll($db);
}elseif(isset($_GET['remove'])){
    $id = $_GET['remove'];
    
    $db->exec("DELETE FROM tennivalok WHERE id=$id");
    
    $response['lista'] = getAll($db);
}

echo json_encode($response);

$db->close();

?>

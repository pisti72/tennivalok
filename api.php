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
    $result = $db->query('SELECT id, szoveg, szin FROM tennivalok ORDER BY id DESC');
    
    $rows = array();
    while( $row = $result->fetchArray()){
        $row_tidy = array();
        $row_tidy['id'] = $row['id'];
        $row_tidy['szoveg'] = $row['szoveg'];
        $row_tidy['szin'] = $row['szin'];
        
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
$db->exec('CREATE TABLE IF NOT EXISTS tennivalok(id INTEGER PRIMARY KEY AUTOINCREMENT, szoveg TEXT, szin INTEGER)');

$response = array();
if($_GET['action']=='getall'){
    
    $response['lista'] = getAll($db);

}elseif($_GET['action']=='insert'){
    $szoveg = $_GET['szoveg'];
    $szin = $_GET['szin'];

    $db->exec("INSERT INTO tennivalok (szoveg, szin) VALUES ('$szoveg',$szin)");

    $response['lista'] = getAll($db);
}elseif($_GET['action']=='remove'){
    $id = $_GET['id'];
    
    $db->exec("DELETE FROM tennivalok WHERE id=$id");
    
    $response['lista'] = getAll($db);
}

echo json_encode($response);

$db->close();

?>

<?php
    //echo "Successfully logged in user";
require_once(__DIR__ . "/../model/config.php");

$array = array(
    'exp1' => '',
    'exp2' => '',
    'exp3' => '',
    'exp4' => '',
    'exp5' => '',
);

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username ='$username'");

if($query->num_rows === 1 ) {
    $row = $query->fetch_array();
    
    if($row["password"] === crypt($password, $row["salt"])) {
        $_SESSION["authenticated"] = true;
        $array["exp1"] = $row["exp"];
        $array["exp2"] = $row["exp"];
        $array["exp3"] = $row["exp"];
        $array["exp4"] = $row["exp"];
        $_SESSION["name"] = $username;
        echo json_encode($array);
    }
    else {
        echo "Invalid username and password";
    }
}
else {
    echo "Invalid username and password";
}
<?php
    require_once(__DIR__ . "/../model/config.php");
    
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
    
    //echo $email . " - " . $username . " - " . $password;
    
    $salt = "$5$" . "rounds=5000" . uniqid(mt_rand(), true) . "$";
    
    //echo $salt;
    $hashedPassword = crypt($password, $salt);
    
    //echo $hashedPassword;
    $query = $_SESSION["connection"]->query("INSERT INTO users SET "
            . "username = '$username',"
            . "password = '$hashedPassword',"
            . "salt = '$salt', "
            . "exp1= 0, "
            . "exp2= 0, "
            . "exp3= 0, "
            . "exp4= 0");
    
    
    $_SESSION["name"] = $username;
    
    if($query) {
        //need for Ajax on index.php
        echo "true";
    }
    else {
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }
<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//ini_set("allow_url_fopen", true);
$file = file_get_contents('php://input');
echo $file ; 

$checkLogin =$file ; 

// This will remove unwanted characters.
// Check http://www.php.net/chr for details
for ($i = 0; $i <= 31; ++$i) { 
    $checkLogin = str_replace(chr($i), "", $checkLogin); 
}
$checkLogin = str_replace(chr(127), "", $checkLogin);

// This is the most common part
// Some file begins with 'efbbbf' to mark the beginning of the file. (binary level)
// here we detect it and we remove it, basically it's the first 3 characters 
if (0 === strpos(bin2hex($checkLogin), 'efbbbf')) {
   $checkLogin = substr($checkLogin, 3);
}

$checkLogin = json_decode( $checkLogin );
//print_r($checkLogin);
var_dump($checkLogin) ;

//$test = "{\n\"email\":\"well\"\n}" ; 
//echo $test ; 
////$file = stripslashes($file );
//$data = json_decode( $file , false );
//echo    json_last_error() ; 
//var_dump($data) ;   
//$userEmail =$data["email"] ; 
//$password = $data["password"] ; 
//$fName = $data["fName"] ; 
//$lName = $data["lName"] ; 
//$address = $data["address"] ;
//$phoneNo = $data["phoneNo"] ; 
//$gender = $data["gender"] ; 

$con = mysqli_connect("localhost","root" , "1234"); 
                if ($con)
                {
                    echo "you are connected <br>"; 
                    mysqli_select_db($con, "saleCount") ;
                   $qString = "insert into users "
                           . "( fName, lName  , address  , email , password , gender , phoneNo )"
                           . "values(\"$fName\" , \"$lName\" , \"$address\" , "
                           . "\"$userEmail\" , \"$password\" , '$gender' , $phoneNo) "; 
                    echo $qString."<br>" ; 
                     $result = mysqli_query($con , $qString)  ;
                     if(!$result)
                         echo 'error happend';
                     
                      
                      echo json_encode($result)   ;
                }
                else 
                    echo"connection error"; 
  ?>
<?php
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Methods", "POST, GET");
include "token.php" ; 
//header('content-type: application/json'); 

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

session_start();  



$toSend = new \stdClass() ; 
$toSend ->success = false ; 
$file = file_get_contents('php://input');


$checkLogin =$file ; 

for ($i = 0; $i <= 31; ++$i) { 
   $checkLogin = str_replace(chr($i), "", $checkLogin); 
}
$checkLogin = str_replace(chr(127), "", $checkLogin);

if (0 === strpos(bin2hex($checkLogin), 'efbbbf')) {
  $checkLogin = substr($checkLogin, 3);
}

$data = json_decode( $checkLogin,true );

$userEmail = $data["email"] ; 
$password = $data["password"] ; 
$con = mysqli_connect("localhost","root" , "1234"); 
                if ($con)
                {
                  //  echo"you are connected <br>"; 
                    mysqli_select_db($con, "salecount") ;
                    $qString = "select * from users where email=\"$userEmail\" and password =\"$password\""; 
                    //echo $qString."<br>" ; 
                     $result = mysqli_query($con , $qString)  ;
                     $rowCount = mysqli_num_rows($result) ; 
                     
                     $toSend = new \stdClass() ; 
                     $toSend ->success = false ; 
                     if($rowCount > 0 )
                     {
                         $row = mysqli_fetch_array($result) ;
                         $ID =   $row["ID"] ;
                         $storeOrNot=$row["storeOrNot"];
                         $toSend ->storeOrNot=$storeOrNot;
                         $toSend -> id = $ID ; 
                         $toSend ->success = true ; 
                         $token =token::  GenerateToken($ID) ; 
                         $toSend ->token = $token ;                          
                         updateUserToken($con , $token , $ID , $toSend) ; 
                       //  $_SESSION['Logged'] = true ;
                         
                     }
                      
                }
                else 
                $toSend ->msg = "Couldn't connect to data base" ; 

      echo json_encode($toSend)   ;

      function updateUserToken($con ,  $token , $userId , $toSend ){         
        $qString = "update users set token='$token' where ID=$userId";
        $result = mysqli_query($con , $qString)  ;
      } 

                
  ?>
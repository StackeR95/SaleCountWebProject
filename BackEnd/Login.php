<?php

header('content-type: application/json'); 

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
$con = mysqli_connect("localhost","root" , ""); 
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
                         $toSend -> id = $row["ID"] ; 
                         $toSend ->success = true ; 
                     }
                      
                }
                else 
                $toSend ->msg = "Couldn't connect to data base" ; 

      echo json_encode($toSend)   ;
                
  ?>
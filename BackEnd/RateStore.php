<?php
header('content-type: application/json'); 

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */ 
$toSend = new \stdClass() ; 
$toSend -> success = false ;

$userId = $_GET["userId"] ; 
$storeId = $_GET["storeId"] ; 
$rate = $_GET["rate"];  
$con = mysqli_connect("localhost","root" , "1234"); 
                if ($con)
                {
                    $date = date("Y-m-d h:i:s") ; 
                   // echo"you are connected <br>"; 
                    mysqli_select_db($con, "saleCount") ;
                   $qString = "insert into rating values("
                                 . "$userId , $storeId , '$date' , $rate)" ;
                    // echo $qString."<br>" ; 
                     $result = mysqli_query($con , $qString)  ;
                     
                     if(!$result) {
                         if( mysqli_errno($con) == 1062)  ;  // duplicate entry 
                             $toSend -> success = false ;
                             $toSend-> msg = "You can't manke another rating"; 
                     }
                     else  
                         $toSend->success=true ; 
             
                }
                else 
                    $toSend->msg  = "Couldn't connect to data base";
        echo json_encode($toSend)   ;
  
?> 
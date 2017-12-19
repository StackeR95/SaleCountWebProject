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
$itemId = $_GET["itemId"] ; 

$con = mysqli_connect("localhost","root" , "1234"); 
                if ($con)
                {
                    $date = date("Y-m-d h:i:s") ; 
                  //  echo"you are connected <br>"; 
                    mysqli_select_db($con, "saleCount") ;
                     $qString = "update item set quantity = quantity+1 where "
                             . "ID =$itemId" ; 
                               //        echo $qString."<br>" ; 
                     $result = mysqli_query($con , $qString)  ;
                     if(!$result)
                    {
                        $toSend->msg = "Couldn't update data" ; 
                    }
                     if(mysqli_affected_rows($con)>0 )
                     {
                       
                         $toSend->success=true ; 
                         $qString = "delete from reservations where itemId=$itemId"
                                    ." and userId = $userId" ; 
                         
                         $result = mysqli_query($con , $qString)  ;
                     }
                     else 
                         $toSend->msg = "This Reservation couldn't be removed" ; 
                    
                  
                }
                else 
                    $toSend->msg  = "Couldn't connect to data base";
                
        echo json_encode($toSend)   ;

  
?> 
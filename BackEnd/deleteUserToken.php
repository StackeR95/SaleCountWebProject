<?php
$userID = $_GET["userId"] ; 
$toSend=new \stdClass();;

$con = mysqli_connect("localhost","root" , "1234"); 
                if ($con)
                { 
                    mysqli_select_db($con, "saleCount") ;
                   $qString = "update users set token=NULL where ID=".$userID;
                     $result = mysqli_query($con , $qString)  ;
                 if(!$result) {
                         if( mysqli_errno($con) == 1062)  ;  // duplicate entry 
                             $toSend -> success = false ;
                             $toSend-> msg = "You can't delete this token or token already deleted"; 
                     }
                     else  
                         $toSend->success=true ;            
                }
                else 
                    $toSend->msg  = "Couldn't connect to data base";
        echo json_encode($toSend)   ;

?>
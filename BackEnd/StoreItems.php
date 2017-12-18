<?php
//header('content-type: application/json'); 
include "token.php" ; 
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */ 

session_start()  ; 

//qeury to get the rating of the store 
$toSend = new \stdClass() ; 
$toSend -> success =false ; 

$token= ' '  ; 
if(isset($_GET["token"]))
    $token = $_GET["token"]; 
$storeId = $_GET["storeId"] ; 
$userId=99;
//$userId = $_GET["userId"] ; 
$con = mysqli_connect("localhost","root" , "1234"); 
                if ($con)
                {
                    // echo"you are connected <br>"; 
                    mysqli_select_db($con, "saleCount") ;
                    if (token:: checkToken($con , $token , $userId) ) { 
                         
                    $qString = "select * from item where storeId =$storeId"; 
                    //  echo $qString."<br>" ; 
                    $result = mysqli_query($con , $qString)  ;
                            
                        if(!$result)
                      //      echo 'error happend';
                        $rowCount = mysqli_num_rows($result) ; 
                        
                        if(mysqli_num_rows($result)!=0){ 
                        
                        //$toSend ->flag = false ; 
                            while ($row = mysqli_fetch_assoc($result))
                            {
                                $toSend->success = true ; 
                                $toSend->items[] = $row ;      
                            }
                            $qString = "select avg(rate) as average from rating where storeId =$storeId";                 
                            $result = mysqli_query($con , $qString)  ;
                            $row = mysqli_fetch_assoc($result) ; 
                            
                            
                            
                            $qString = "select userId from rating where storeId =$storeId"
                                    . " and userId=$userId";                 
                            $result = mysqli_query($con , $qString);                      
                            $rowCount = mysqli_num_rows($result) ; 
                            
                            if ($rowCount > 0 ) 
                                $toSend->rated  = true ;
                            else 
                                $toSend->rated = false ; 

                            
                            
                            $toSend -> rating = $row["average"] ; 
                        }else 
                             $toSend->msg= "No Items" ;
                    

                    }
                     else    
                        $toSend->msg  = "error in token" ; 
                     
                }
                else 
                    $toSend->msg  = "Couldn't connect to data base" ; 
  //          }
    echo json_encode($toSend)   ;
?> 
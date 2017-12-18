<?php
header('content-type: application/json'); 
include "token.php" ; 
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */ 

 
//get All user reserved items   
//Method GET 
//parameters syntax     token

// test url : http://localhost:3000/UserReservedItems.php?token=(get token from login)
session_start()  ; 

//qeury to get the rating of the store 
$toSend = new \stdClass() ; 
$toSend -> success =false ; 

$token= ' '  ; 
if(isset($_GET["token"]))
    $token = $_GET["token"]; 
$userId=99;
//$userId = $_GET["userId"] ; 
$con = mysqli_connect("localhost","root" , "1234"); 
                if ($con)
                {
                    // echo"you are connected <br>"; 
                    mysqli_select_db($con, "saleCount") ;
                    if (token:: checkToken($con , $token , $userId) ) { 
                         
                    $qString ="select i.name as itemName , i.pic itemPic , i.discription , i.price ,
                    i.discount, r.reservationDate , s.name as storeName , s.pic as storePic , s.address 
                    ,i.ID as itemId , r.userId
                    from item i, reservations r , store s where 
                    i.ID = r.itemId and s.ID = i.storeId  and r.userId= $userId"; //  echo $qString."<br>" ; 
                    $result = mysqli_query($con , $qString)  ;
                            
                        if(!$result)
                      //      echo 'error happend';
                        $rowCount = mysqli_num_rows($result) ; 
                        
                        if(mysqli_num_rows($result)!=0){ 
                        
                        //$toSend ->flag = false ; 
                            $toSend->success = true ; 
                        
                            while ($row = mysqli_fetch_assoc($result))
                            {
                                $toSend->items[] = $row ;      
                            }
                                                        
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
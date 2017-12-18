<?php

include "token.php" ; 
header('content-type: application/json'); 

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 
// Get All user Details in userDeatils variable sent in Json 
//Method GET 
//query parameters  token: the token of the user  
//test url : http://localhost:3000/GetUserDetails.php?token=(get token from login)
session_start();  



$toSend = new \stdClass() ; 
$toSend ->success = false ; 



$token= ' '  ; 
if(isset($_GET["token"]))
    $token = $_GET["token"];

$userId = 99 ; 

$con = mysqli_connect("localhost","root" , "1234"); 
                if ($con)
                {
                  //  echo"you are connected <br>"; 
                    mysqli_select_db($con, "salecount") ;
                    if (token:: checkToken($con , $token , $userId) ) { 
                            
                        $qString = "select * from users where ID =$userId"; 
                        //echo $qString."<br>" ; 
                        $result = mysqli_query($con , $qString)  ;
                        while ($row = mysqli_fetch_assoc($result))
                        {
                            $toSend->success = true ; 
                            $toSend->UserDetails = $row ;      
                        }                        
                    }
                    else    
                       $toSend->msg  = "error in token" ;
                }
                else 
                  $toSend ->msg = "Couldn't connect to data base" ; 

      echo json_encode($toSend)   ;                
  ?>
<?php
header('content-type: application/json'); 
include "token.php" ; 
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */ 
session_start()  ; 

$toSend = new \stdClass() ; 
$toSend -> success =false ; 
// if( isset($_SESSION['Logged'])) 
//       $toSend -> success = true ;        
// else 
//     $toSend -> success =false ;  
//     $toSend -> MSG= "He Came Here";

//if(    $toSend -> success == true ){
$token= ' '  ; 
if(isset($_GET["token"]))
    $token = $_GET["token"]; 

$con = mysqli_connect("localhost","root" , "1234"); 
                if ($con)
                {
                    mysqli_select_db($con, "saleCount") ;                    
                   if (token :: checkToken($con , $token) ) { 
                    // echo"you are connected <br>"; 
                        $qString = "select * from store"; 
                    //  echo $qString."<br>" ; 
                        $result = mysqli_query($con , $qString)  ;
                        if(!$result)
                        //     echo 'error happend';
                        $rowCount = mysqli_num_rows($result) ; 
                        
                        // $toSend = new \stdClass() ; 
                        //$toSend ->flag = false ; 
                        while ($row = mysqli_fetch_assoc($result))
                        {
                            
                            $toSend->Stores[] = $row ; 
                            //$toSend -> id = $row["ID"] ; 
                            $toSend ->success = true ;
                            $toSend ->token = $token ; 
                            //var_dump($row) ; 
                        }
                    }
                    else 
                        $toSend->msg  = "Token is not Right";
                    
                }
                else 
                    $toSend->msg  = "Couldn't connect to data base";
//    }
       echo json_encode($toSend)   ;


?> 
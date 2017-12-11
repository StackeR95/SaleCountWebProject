<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$userEmail = $_GET["email"] ; 
$password = $_GET["password"] ; 
$con = mysqli_connect("localhost","root" , "1234"); 
                if ($con)
                {
                    echo"you are connected <br>"; 
                    mysqli_select_db($con, "saleCount") ;
                   $qString = "select * from users where email=\"$userEmail\" and password =\"$password\""; 
                    echo $qString."<br>" ; 
                     $result = mysqli_query($con , $qString)  ;
                     if(!$result)
                         echo 'error happend';
                     $rowCount = mysqli_num_rows($result) ; 
                     
                     $toSend = new \stdClass() ; 
                     $toSend ->flag = false ; 
                     if($rowCount > 0 )
                     {
                         $row = mysqli_fetch_array($result) ; 
                         $toSend -> id = $row["ID"] ; 
                         $toSend ->flag = true ; 
                     }
                      
                      echo json_encode($toSend)   ;
                }
                else 
                    echo"connection error"; 
  ?>
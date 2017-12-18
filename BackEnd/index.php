<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->

<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
            include "token.php" ; 
            $con = mysqli_connect("localhost","root" , "1234"); 
            mysqli_select_db($con, "saleCount") ;            
            $token = token:: GenerateToken(5) ;
            if(token:: checkToken($con , $token) ) 
                echo "yes" ;
            else 
                echo "no" ; 
            
        ?>
    </body>
</html>

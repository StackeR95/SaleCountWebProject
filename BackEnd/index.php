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
            include 'jwt_helper.php' ;
            $key = "wello&dola are the best"; 
            $token = array();
            $token['id'] = 2;
            $token =  JWT::encode($token, $key); 
            echo $token."<br>" ; 

           echo  JWT::decode($token, $key)->id;
        ?>
    </body>
</html>

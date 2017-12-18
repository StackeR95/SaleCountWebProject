<?php
        include 'jwt_helper.php' ;
        

    class token { 
       
      private static function GetKey () {
        $day = date("d") ; 
        $key = "wello&dola are the bst".$day; 
        return $key ; 
      }
     public static function GenerateToken ($userId){
        $key = token::GetKey() ; 
        $token = array();
        $token['id'] =$userId;
        $token =  JWT::encode($token, $key);
        return $token ; 
      }
      public static function checkToken($con , $token ,&$userId = 0){
        $key = token::GetKey() ; 
        if($token == " ")
            return false ; 
        try {
        $ID=  JWT::decode($token, $key)->id;
        }catch(Exception $e){
            return false ; 
        }
        $userId= $ID;
        $qString = "select * from users where ID=$ID"; 
        //echo $qString ; 
        $result = mysqli_query($con , $qString)  ;
        if(!$result)
            return false ; 
        if(mysqli_num_rows($result)>0)
            return true ; 
        else 
            return false ; 

   } 
}

?>
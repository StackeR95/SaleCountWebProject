<?php

header('content-type: application/json'); 


$toSend = new \stdClass() ; 
$toSend ->success = false ; 
$file = file_get_contents('php://input');
 

$checkLogin =$file ; 

for ($i = 0; $i <= 31; ++$i) { 
    $checkLogin = str_replace(chr($i), "", $checkLogin); 
}
$checkLogin = str_replace(chr(127), "", $checkLogin);

if (0 === strpos(bin2hex($checkLogin), 'efbbbf')) {
   $checkLogin = substr($checkLogin, 3);
}

$data = json_decode( $checkLogin,true );

$storeEmail =$data["email"] ; 
$name = $data["name"] ; 
$address = $data["address"] ;
$phoneNo = $data["phoneNo"] ; 
$pic = $data["pic"] ; 
$discription = $data["discription"] ; 


$con = mysqli_connect("localhost","root" , "1234"); 
if ($con)
{
    //echo "you are connected <br>"; 
    mysqli_select_db($con, "saleCount") ;
   $qString = "insert into store "
           . "( name, address  , email , phoneNo , pic , discription )"
           . "values(\"$name\"  , \"$address\" , "
           .  "\"$storeEmail\" , $phoneNo , \"$pic\" , \"$discription\" ) "; 
    //echo $qString."<br>" ; 
     $result = mysqli_query($con , $qString)  ;
     if(!$result) {
        if( mysqli_errno($con) == 1062)  ;  // duplicate entry 
            $toSend-> msg = "This store already exists   "; 
    }
    else {
        $toSend->success = true ; 
        $StoreID = mysqli_insert_id($con) ; 
        
        $qString = "insert into users "
        . "( fName,lName,email, password , storeOrNot) "
        . "values(\"$name\",'Store',\"$storeEmail\" , '1234' ,$StoreID  ) "; 
 //echo $qString."<br>" ; 
         $result = mysqli_query($con , $qString)  ;
    }
      
}
else 
$toSend ->msg = "Couldn't connect to data base" ; 

echo json_encode($toSend);

?>
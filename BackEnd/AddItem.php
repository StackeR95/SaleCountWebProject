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

$name = $data["name"] ; 
$pic = $data["pic"] ; 
$discription = $data["discription"] ; 
$price =$data["price"] ;
$discount =$data["discount"] ;
$quntity =$data["quntity"] ;
$storeId =$data["storeId"] ;




$con = mysqli_connect("localhost","root" , "1234"); 
if ($con)
{
    //echo "you are connected <br>"; 
    mysqli_select_db($con, "saleCount") ;
   $qString = "insert into item "
           . "( name, price  , discount , quantity , pic , discription , storeId )"
           . "values(\"$name\"  , \"$price\" ,$discount, "
           .  " $quntity , \"$pic\" , \"$discription\" , $storeId ) "; 
    $toSend->query = $qString ; 
    //echo $qString."<br>" ; 
     $result = mysqli_query($con , $qString)  ;
     if(!$result) {
        if( mysqli_errno($con) == 1062)  ;  // duplicate entry 
            $toSend-> msg = "this item already exist "; 
    }
    else 
        $toSend->success = true ; 
    
     
      
}
else 
$toSend ->msg = "Couldn't connect to data base" ; 

echo json_encode($toSend);

?>
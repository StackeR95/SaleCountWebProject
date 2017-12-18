<?php

header('content-type: application/json'); 


$toSend = new \stdClass() ; 
$toSend ->success = false ; 
$file = file_get_contents('php://input');

//Update All user Details  
//Method POST 
//parameters syntax     email:
//                      password
//                      ID: the id of the user to be updated 
//                      gender 
//                      phoneNo
//                      address 
//                      fName 
//                      lName 
$checkLogin =$file ; 

for ($i = 0; $i <= 31; ++$i) { 
    $checkLogin = str_replace(chr($i), "", $checkLogin); 
}
$checkLogin = str_replace(chr(127), "", $checkLogin);

if (0 === strpos(bin2hex($checkLogin), 'efbbbf')) {
   $checkLogin = substr($checkLogin, 3);
}

$data = json_decode( $checkLogin,true );

$userEmail =$data["email"] ; 
$password = $data["password"] ; 
$fName = $data["fName"] ; 
$lName = $data["lName"] ; 
$address = $data["address"] ;
$phoneNo = $data["phoneNo"] ; 
$gender = $data["gender"] ; 
$userId = $data["ID"] ; 


$con = mysqli_connect("localhost","root" , "1234"); 
    if ($con)
    {
        //echo "you are connected <br>"; 
        mysqli_select_db($con, "saleCount") ;
    $qString = "update users set "
            . "fName=\"$fName\" , lName=\"$lName\" , address=\"$address\" , "
            . "email=\"$userEmail\" , password=\"$password\" , gender='$gender' ,phoneNo= $phoneNo"
            . " where ID =$userId"; 
        //echo $qString."<br>" ; 
        $result = mysqli_query($con , $qString)  ;
        if(!$result) {
            if( mysqli_errno($con) == 1062)  ;  // duplicate entry 
                $toSend-> msg = "This user already exist"; 
        }
        else 
            $toSend->success = true ; 
        
        
        
    }
    else 
        $toSend ->msg = "Couldn't connect to data base" ; 

echo json_encode($toSend);

?>
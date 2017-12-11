<?php


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

foreach ($data as $k=>$v){
    echo $k; // etc.
    echo "</br>";
}
$userEmail =$data["email"] ; 
$password = $data["password"] ; 
$fName = $data["fName"] ; 
$lName = $data["lName"] ; 
$address = $data["address"] ;
$phoneNo = $data["phoneNo"] ; 
$gender = $data["gender"] ; 

$con = mysqli_connect("localhost","root" , ""); 
if ($con)
{
    echo "you are connected <br>"; 
    mysqli_select_db($con, "saleCount") ;
   $qString = "insert into users "
           . "( fName, lName  , address  , email , password , gender , phoneNo )"
           . "values(\"$fName\" , \"$lName\" , \"$address\" , "
           . "\"$userEmail\" , \"$password\" , '$gender' , $phoneNo) "; 
    echo $qString."<br>" ; 
     $result = mysqli_query($con , $qString)  ;
     if(!$result)
         echo 'error happend';
     
      
      echo json_encode($result)   ;
}
else 
    echo"connection error"; 
?>
import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private  http:Http) { }


  updateUserData(data)
  {
    const body=JSON.stringify(data);
    const headers=new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post("http://localhost:3000/UpdateProfile.php",body,{headers:headers});
  }
  getUserReservedItems()
  {
    var token =  localStorage.getItem("token") ; 
    if(typeof(token)!="undefined")
    return this.http.get("http://localhost:3000/UserReservedItems.php?token="+token);
 else 
   return this.http.get("http://localhost:3000/UserReservedItems.php");
 
  }
  getUserData(){
    var token =  localStorage.getItem("token") ; 
    if(typeof(token)!="undefined")
    return this.http.get("http://localhost:3000/GetUserDetails.php?token="+token);
 else 
   return this.http.get("http://localhost:3000/GetUserDetails.php");
 
  }
  reserveItem(userID,itemID)
  {
    return this.http.get("http://localhost:3000/ReserveItem.php?userId="+userID+"&itemId="+itemID);
  }
  getStoreData()
  {
  var token =  localStorage.getItem("token") ; 
  console.log("in get store data service " ,"http://localhost:3000/StoreList.php?token="+token );
  if(typeof(token)!="undefined")
     return this.http.get("http://localhost:3000/StoreList.php?token="+token);
  else 
    return this.http.get("http://localhost:3000/StoreList.php");
  
  }
 getItemData(storeID)
 {
    var token =  localStorage.getItem("token") ; 
    console.log("in get item data service" , "http://localhost:3000/StoreItems.php?storeId="+storeID+"&token="+token);
    if(typeof(token)!="undefined")
       return this.http.get("http://localhost:3000/StoreItems.php?storeId="+storeID+"&token="+token);
    else 
       return this.http.get("http://localhost:3000/StoreItems.php") ; 
 }
 loginUser(data)
 {
   const body=JSON.stringify(data);
   const headers=new Headers();
   headers.append("Content-Type","application/json");
   return this.http.post("http://localhost:3000/Login.php",body,{headers:headers});
 }
 registerUser(data)
 {
  const body=JSON.stringify(data);
  const headers=new Headers();
  headers.append("Content-Type","application/json");
  return this.http.post("http://localhost:3000/Register.php",body,{headers:headers});
 }
}

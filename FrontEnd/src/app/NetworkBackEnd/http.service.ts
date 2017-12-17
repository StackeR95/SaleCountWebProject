import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private  http:Http) { }
  getStoreData()
 {
 return this.http.get("http://localhost:3000/StoreList.php");
 }
 getItemData(storeID,userID)
 {

   return this.http.get("http://localhost:3000/StoreItems.php?storeId="+storeID+"&userId="+userID);
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

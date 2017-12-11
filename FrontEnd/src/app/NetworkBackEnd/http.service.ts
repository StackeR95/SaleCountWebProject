import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private  http:Http) { }
  getData()
 {
 return this.http.get("http://localhost:3000/Sample.php");
 }
 sendLoginData(data)
 {
   const body=JSON.stringify(data);
   const headers=new Headers();
   headers.append("Content-Type","application/json");
   return this.http.post("http://localhost:3000/Login.php",body,{headers:headers});
 }
}

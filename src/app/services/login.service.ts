import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginSubjectCheck = new Subject<Boolean>();

  constructor(private client:HttpClient) 
  {
   }

   getCurrentUser(){
    return this.client.get(`${baseUrl}/current-user`)
   }

   generateToken(loginData:any){
    return this.client.post(`${baseUrl}/generate-token`,loginData);
   }

   //set token to loacl storage
   public loginUser(token:any){
      localStorage.setItem("token",token);
   }

   //check for used login
   public isLoggedin(){
    let tokenStr = localStorage.getItem("token")

    if(tokenStr==undefined||tokenStr==""||tokenStr==null){
      return false;
    }
    else
     return true;
  }
     //logout :  remove token from local storage
     public logout(){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
     }
     //get token
     public getToken(){
      return localStorage.getItem("token")
     }

     //set user
     public createUser(user:any){
      localStorage.setItem("user",JSON.stringify(user))
     }

     public getUser(){
      let userStr = localStorage.getItem("user")
      if(userStr!=null){
        return JSON.parse(userStr)
      }
      else{
        this.logout()
        return null
      }
     }
     
    public getRole(){
      let user = this.getUser();
      if(user!=null){
        return user.authorities[0].authority;
      }
      return null;
    }

   
}

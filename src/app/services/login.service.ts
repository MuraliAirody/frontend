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
      // window.location.reload();
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

    // checking token expiration, even user still loggedin. local storage contain user data,but token in expire
    //that time we are not able to get data from server, so I make it logout if token expire
    //even when user still logged in also
   token:any = this.getToken()
    public isTokenExpired() {
      if(this.token)
        { const expiry = (JSON.parse(atob(this.token.split('.')[1]))).exp;
          console.log("expiry",expiry*1000);
          console.log("date  ",Date.now());

          return expiry*1000 < Date.now();

        } 

        return false;
      
    }
}

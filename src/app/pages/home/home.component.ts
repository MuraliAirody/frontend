import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private loginService:LoginService,
    private _routr:Router){

  }

  user:any;
  role:any;
  auth:any;
  ngOnInit():void{
 console.log(this.loginService.isLoggedin());
 
    if(this.loginService.isLoggedin()){
      if(this.loginService.isTokenExpired()==false){
        this.loginService.getCurrentUser().subscribe({
          next:(data:any)=>{
            this.user = data;
            console.log(data);
  
            
      console.log(this.user);
      this.role = this.user.authorities[0].authority
      if(this.role == 'ADMIN')
        this.auth = "admin-dashboard"
      else
        this.auth = "user-dashboard"  
            
          },
          error:(data)=>{
            console.log(data);
            
          }
        })
      }
      else{
        this.loginService.logout();
      }
    }
    else{
      this._routr.navigate(["login"])
    }


  }

}

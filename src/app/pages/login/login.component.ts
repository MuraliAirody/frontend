import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private snack:MatSnackBar,private loginService:LoginService,private router:Router){

  }
  public loginData={
    username:"",
    password:""
  };

  loginSubmit(){
      console.log("login button clicked");
      
    if(this.loginData.username.trim()=='' || this.loginData.username==null){
       this.snack.open("user name cannot be empty","",{
        duration:3000
       })
       return
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open("Password cannot be empty","",{
       duration:3000
      }) 
      return
   }
   this.loginService.generateToken(this.loginData).subscribe({
    next:(data:any)=>{
      console.log("success")
      console.log(data.token);

      this.loginService.loginUser(data.token)

      this.loginService.getCurrentUser().subscribe({
        next:(user:any)=>{
           console.log("user ->",user);
           
           this.loginService.createUser(user)
          //  console.log("getting user ",this.loginService.getUser());
          //  console.log("role ",this.loginService.getRole())

           //validate User : redirect user to user dashboard
           //validate Admin : redirect admin to admin dashboard

           if(this.loginService.getRole()=='ADMIN')
           {
              // window.location.href="/admin-dashboard"
              this.router.navigate(["admin-dashboard"])
           }else if(this.loginService.getRole()=='USER')
           {
            // window.location.href="/user-dashboard"
            this.router.navigate(["user-dashboard"])
           }else{
            this.loginService.logout()
           }
        },
        error:(data)=>{
            console.log(data);
        }
      })
    },
    error:(data)=>{
      this.snack.open("Invalid user details","",{
        duration:3000
      })        
      console.log(data);   
    }
   })
  }
}



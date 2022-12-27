import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn=false
  user:any=null

 
  constructor(public loginService:LoginService){

  }
  ngOnInit():void{
    this.isLoggedIn=this.loginService.isLoggedin()
    this.user=this.loginService.getUser()
    this.loginService.loginSubjectCheck.asObservable().subscribe({
      next:(data:any)=>{
        this.isLoggedIn=this.loginService.isLoggedin()
        this.user=this.loginService.getUser()
      }
    })
 }


  logout(){
    this.loginService.logout()
    this.isLoggedIn=false
    this.user=null
    window.location.reload()
  }
}

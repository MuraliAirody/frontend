import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private loginService:LoginService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      console.log(this.loginService.isTokenExpired());
      
    if(this.loginService.getRole()=='ADMIN'&&this.loginService.isLoggedin()==true && this.loginService.isTokenExpired()==false)   
      {
        return true;
      } 
    else{
      this.router.navigate(["login"])
      this.loginService.logout();
    return false;
    }  
  }
  

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public user={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:''
  }


  formSubmit(){
      
    console.log(this.user);
    (this.user)
    if(this.user.username==''||this.user.password=='')
    {
      alert("all field sare required")
    }

    //add user
    this.userService.addUser(this.user).subscribe(data=>
      console.log(data));
  }


}

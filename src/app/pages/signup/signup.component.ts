import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,
              private snack:MatSnackBar){

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
      // alert("all field sare required")
       this.snack.open("Username and password required","",{
        duration:3000
       })
       return
    }

    //add user
    this.userService.addUser(this.user).subscribe({
      next:(success)=>{
        console.log(success);
        // alert("success")
        this.snack.open("User added successfully","",{
          duration:3000
        })
        //instead of snack bar we can also add sweet alert from 3rd party
      },
      error:(error)=>{
        console.log(error);
        this.snack.open("Something went wrong","",{
          duration:3000
        })
      }
    })

  }
}

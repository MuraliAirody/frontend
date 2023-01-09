import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  category={
    title:"",
    description:"",
  }

  constructor(private snack:MatSnackBar,private _category:CategoriesService){

  }

  formSubmit(){
    console.log("form submit clicked");
    
    if(this.category.title.trim()=="" || this.category.title==null){
       this.snack.open("Title is required","",{
        duration:3000,
       })
    }
    else{
      this._category.addCategory(this.category).subscribe({
        next:(data)=>{
          this.snack.open("Category added successfully","",{
            duration:3000,
           })
        },
        error:(error)=>{
          this.snack.open("Server Error","",{
            duration:3000,
           })
        }
      })
       }  
    }
  }
 


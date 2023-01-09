import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent {

  category:any=[

  ]

  constructor(private _viewCategoryService:CategoriesService,private snack:MatSnackBar){

  }

  ngOnInit():void{
     this._viewCategoryService.categories().subscribe({
      next:(data)=>{
        this.category=data;
      },
      error:(error)=>{
        this.snack.open("Error in loading data","",{
          duration:3000
        })
      }
     })
  }
}

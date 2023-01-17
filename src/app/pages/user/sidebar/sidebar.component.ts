import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  categories:any;

  constructor(private _categoryService:CategoriesService){

  }

  ngOnInit():void{
    this._categoryService.categories().subscribe({
      next:(data)=>{
        this.categories=data;
      },
      error:(error)=>{
        Swal.fire("Error","Something went wrong","error");
      }
    })
  }
}

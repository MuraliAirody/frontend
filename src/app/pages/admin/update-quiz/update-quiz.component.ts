import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent{

  constructor(private route:ActivatedRoute,
    private quizService:QuizService,
    private categoryService:CategoriesService,
    private routing:Router){

  }
  
  qId: any=0
quiz:any=null
categories:any=null
  ngOnInit(){
     this.qId = this.route.snapshot.params['qId']
   
     this.quizService.getQuiz(this.qId).subscribe({
      next:(data)=>{
        this.quiz = data;
        console.log(this.quiz);
        
      },
      error:(error)=>{
        console.log(error)
      }
     })

     this.categoryService.categories().subscribe({
      next:(data:any)=>{
       this.categories = data;
       console.log(data);
       
      },
      error:(error)=>{
           console.log(error);
               
      }
     })
    
  }

  updateQuiz(){
   
    if(this.quiz.title.trim()=="" || this.quiz.title==null){
      Swal.fire("Error","Title must be required","error")

      return
    }
    if(this.quiz.maxMarks==0||this.quiz.numberOfQuestions==0||this.quiz.category==null)
    {
      Swal.fire("Error","Every field must be needed","error")

      return
    }


    this.quizService.updateQuiz(this.quiz).subscribe({
      next:(data)=>{
        Swal.fire({
          icon:'success',
          title:"successfully updated",
          showConfirmButton:false,
          timer:3000
        }).then((data)=>{
        this.routing.navigate(["/admin-dashboard/view-quizzes"]);
        })
      },
      error:(error)=>{
        Swal.fire("Error","Server Error","error")
      }
    })
  }

}

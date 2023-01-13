import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'src/app/services/categories.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {

  categories:any=[]

  quizData={
    title:'',
    description:'',
    maxMarks:null,
    numberOfQuestions:null,
    active:false,
    category:{
      cId:''
    }
  }

  constructor(private categoryService:CategoriesService,
              private snack:MatSnackBar,
              private quizService:QuizService){

  }

  ngOnInit():void{
    this.categoryService.categories().subscribe({
     next:(data:any)=>{
      this.categories = data;
     },
     error:(error)=>{
       this.snack.open("Error in Loading data","",{
        duration:3000
       })
     }
    })
  }

  formSubmit(){
    if(this.quizData.title.trim()=="" || this.quizData.title==null){
      this.snack.open("Title must be required","",{
        duration:3000
      })
      return
    }
    if(this.quizData.maxMarks==null||this.quizData.numberOfQuestions==null||this.quizData.category==null)
    {
      this.snack.open("All the fields are required","",{
        duration:3000
      })
      return
    }

    this.quizService.addQuiz(this.quizData).subscribe({
      next:(data)=>{
        this.snack.open("Quiz successfully created","",{
          duration:3000
        })
        
        //once add the data we sre clearing the data in the form field

        this.quizData={
          title:'',
          description:'',
          maxMarks:null,
          numberOfQuestions:null,
          active:false,
          category:{
            cId:''
          }
        }

      },
      error:(error)=>{
        this.snack.open("Error in creating the quiz","",{
          duration:3000
        })
      
      }
    })
    
  }
}

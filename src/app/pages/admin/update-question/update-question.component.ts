import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent {

  quesId:any;
  question:any;

  constructor(private _route:ActivatedRoute,
    private _questionService:QuestionService,
    private routing:Router,
    private _snack:MatSnackBar){

  }

  ngOnInit():void{
    this.quesId = this._route.snapshot.params['quesId'];
    console.log(this.quesId);
    
  
    this._questionService.getQuestion(this.quesId).subscribe({
      next:(data:any)=>{
         this.question = data;  
         
         
         
      },
      error:(error)=>{
        console.log("error",error);
        
      }
    })
  }

  formSubmit(){

     if(this.question.content.trim()==''||this.question.content==null)
    {
      this._snack.open("Conetent required","",{
        duration:3000
      })
      return 
    }
    if(this.question.option1.trim()==''||this.question.option1==null){
      this._snack.open("option 1 required","",{
        duration:3000
      })
      return 
    }
    if(this.question.option2.trim()==''||this.question.option2==null){
      this._snack.open("option 2 required","",{
        duration:3000
      })
      return 
    }
    if(this.question.answer.trim()==''||this.question.answer==null){
      this._snack.open("answer required","",{
        duration:3000
      })
      return 
    }

    this._questionService.updateQuestion(this.question).subscribe({
      next:(data)=>{
        Swal.fire({
          icon:'success',
          title:"Success",
          text:"Question updated",
          timer:3000,
          showConfirmButton:false,
        }).then((result)=>{
         const qid=this.question.quiz['qId']
         const title=this.question.quiz['title']
            this.routing.navigate([`/admin-dashboard/view-questions/${qid}/${title}`])
        })
      },
      error:(error)=>{
        Swal.fire({
          icon:'error',
          title:"Error",
          text:"Something wrong",
          timer:3000,
          showConfirmButton:false,
        })
      }
    })
  }
}

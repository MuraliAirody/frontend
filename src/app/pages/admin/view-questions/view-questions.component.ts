import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent {

  constructor(private _router:ActivatedRoute,
    private quesionService:QuestionService){

  }

  qID:any;
  title:any;
  questions:any=[]

  ngOnInit():void{
    this.qID = this._router.snapshot.params['qId'];
    this.title = this._router.snapshot.params['title'];

    this.quesionService.getQuestions(this.qID).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.questions=data
        console.log(this.questions);
        
      },
      error:(error)=>{
        console.log(error);
        
      }
    })

  }

  deleteQuestion(quesId:any){
 
    Swal.fire({
      icon:'question',
      title:"Delete ?",
      text:"Are you sure, you want to delete this question",
      showCancelButton:true,
      cancelButtonColor:'green',
      confirmButtonText:'Delete',
      confirmButtonColor:'red'
      
    }).then((result)=>{
      if(result.isConfirmed){
        this.quesionService.deleteQuestion(quesId).subscribe({
          next:(data)=>{
            Swal.fire("Success","Question deleted successfully","success");
            this.questions = this.questions.filter((q:any)=>q.quesId!=quesId)
          },
          error:(error)=>{
            Swal.fire("Error","Something went wrong","error");
          }
        })
      }
    })
    
  }
}

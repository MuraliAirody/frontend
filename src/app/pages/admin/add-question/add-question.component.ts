import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {

  qId:any;
  title:any;

  question:any={
    quiz:{
      
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
    
  }

  constructor(private _route:ActivatedRoute,
    private _questionService:QuestionService,
    private _snack:MatSnackBar){

  }
  
  ngOnInit():void{
    this.qId= this._route.snapshot.params['qId'];
    this.title = this._route.snapshot.params['title'];

    console.log(this.qId+" "+this.title);

    this.question.quiz['qId']=this.qId;
    
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

    this._questionService.addQuestion(this.question).subscribe({
      next:(data)=>{
        Swal.fire({
          icon:'success',
          title:"Question added successfully",
          text:"Add another question",
          showConfirmButton:false,
          timer:3000
        })
        
        this.question.content='',
        this.question.option1=''
        this.question.option2=''
        this.question.option3=''
        this.question.option4=''
        this.question.answer=''
      },
      error:(error)=>{
        Swal.fire({
          icon:'error',
          title:"Somethoing went wrong",
          showConfirmButton:false,
          timer:3000
        })
      }
    })
  }
}

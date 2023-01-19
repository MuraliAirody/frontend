import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent {

  cId:any;
  constructor(private _route:ActivatedRoute,
    private _quizService:QuizService){

  }
  quizzes:any;

  ngOnInit():void{

    this._route.params.subscribe((params)=>{
      // this.cId = this._route.snapshot.params['cId']
      // console.log(this.cId);
  
      this.cId = params['cId']

      if(this.cId == 0){
        this._quizService.getActiveQuiz().subscribe({
          next:data=>{
            this.quizzes = data
            console.log(this.quizzes);
            
          },
          error:error=>{
            console.log(error);
            
            alert("error")
          }
        }) 
      }
      else{
        this._quizService.getActiveQuizOfCategory(this.cId).subscribe({
          next:data=>{
            console.log(data);
            this.quizzes = data
            
          },
          error:error=>{
            console.log(error);
            
          }
        })
      }
    })


    
  }
}

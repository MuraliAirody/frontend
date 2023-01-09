import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent {

  quizzes:any=[]

  constructor(private snack:MatSnackBar,private service:QuizService){

  }

  ngOnInit():void{
    this.service.getQuizzes().subscribe({
      next:(data)=>{
        this.quizzes=data;
        console.log(data);
        
      },
      error:(error)=>{
        this.snack.open("Server Error","",{
          duration:3000
        })
      }
    })
  }
}

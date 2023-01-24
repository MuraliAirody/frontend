import { NotExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent {

  constructor(private _route:ActivatedRoute,
    private quizSeervice:QuizService,
    private snack:MatSnackBar,
    private router:Router){

  }

  qId:any;
  quiz:any;

  ngOnInit():void{
    this.qId=this._route.snapshot.params["qId"];
    // console.log(this.qId);

    this.quizSeervice.getQuiz(this.qId).subscribe({
      next:(data: any)=>{
        this.quiz=data;
        console.log(this.quiz);
        
      },
      error:error=>{
       this.snack.open("Error in loading quiz","",{
        duration:3000
       })
      }
  
    })
  }

  startQuiz(){
    Swal.fire({
      title: 'Are you sure, Want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(["/start/"+this.qId])
      } else if (result.isDenied) {
      }
    })
    
  }
}

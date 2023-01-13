import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

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
        
      },
      error:(error)=>{
        this.snack.open("Server Error","",{
          duration:3000
        })
      }
    })
  }

  delete(_qid: any){
    Swal.fire({
      icon:'question',
      title:'Are you sure ?',
      text:'All the question of this quiz also getting delete',
      confirmButtonText:'Confirm',
      confirmButtonColor:'red',
      showCancelButton:true,
      cancelButtonColor:"green",
      cancelButtonText:'Cancel'
    }).then(result=>{
      if(result.isConfirmed)
      {
        this.service.deleteQuiz(_qid).subscribe({
          next:(data)=>{
            this.ngOnInit();
            Swal.fire('Success','The quiz is successfully deleted ..','success')
          },
          error:(error)=>{
            Swal.fire('Error','The Server Error','error')
            
          }
        })
      }
    })
  }
}


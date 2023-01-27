import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {

  constructor(private _route:ActivatedRoute,
    private _questionService:QuestionService){

  }

  qId:any;
  questions:any=[];
  marksGot=0;
  correctAnswer=0;
  attempted=0;

  isDone = false;

  timer = 0;

  ngOnInit():void{
    this.qId = this._route.snapshot.params["qId"];
    // console.log(this.qId);
    this.loadQuestons();
  }
  loadQuestons() {
    this._questionService.getQuestionsforQuiz(this.qId).subscribe({
      next:data=>{
        this.questions = data
        console.log(this.questions);
        
        this.timer = this.questions.length * 1.5 * 60;
        console.log(this.questions.length);
        

        // this.questions.forEach((q:any)=> {
        //   q['givenAnswer']=''
        // });

        this.stratTimer()
      },
      error:error=>{
        console.log(error);
        
      }
    })
  }

  onSubmit(){
    Swal.fire({
      title: 'Submit the quiz ?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
         this.marksEvaluation();

      } else if (result.isDenied) {
      }
    })
  }

  marksEvaluation(){

    this.isDone=true;

    // this.questions.forEach((q:any)=>{

    //   // console.log("marks",q.quiz.maxMarks);
    //   // console.log("ques",q.quiz.numberOfQuestions);
    //   if(q.answer == q.givenAnswer)
    //   {
    //     this.correctAnswer++;
               
    //     let singleMarks=q.quiz.maxMarks / q.quiz.numberOfQuestions;
    //     // console.log(singleMarks);
    //     this.marksGot = + singleMarks;
        
    //   }  
    //   if(q.givenAnswer.trim()!='')
    //   {
    //     this.attempted ++ ;
    //   }          
    // })
    // console.log(this.correctAnswer);
    // console.log(this.marksGot);
    // console.log(this.attempted);

    this._questionService.evaluvateAnswer(this.questions).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.marksGot = data.marksGot;
        this.correctAnswer = data.correctAnswer;
        this.attempted = data.attempted;
        
      },
      error:error=>{
        console.log(error);
        
      }
    })
    
  }

  stratTimer(){
   let t =  window.setInterval(()=>{
        if(this.timer<=0){
          this.marksEvaluation()
          clearInterval(t);
        }else{
          this.timer -- ;
        }
    },1000)
  }

  exactTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm *60

    return `${mm} Min : ${ss} Sec`
  }
}

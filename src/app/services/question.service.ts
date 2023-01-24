import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _client:HttpClient) { }

  public getQuestions(qId: any){
   return this._client.get(`${baseUrl}/question/quiz/all/${qId}`)
  }

  public addQuestion(question:any){
    return this._client.post(`${baseUrl}/question/`,question);
  }

  public deleteQuestion(quesId:any){
    return this._client.delete(`${baseUrl}/question/${quesId}`)
  }

  public getQuestion(quesId:any){
    return this._client.get(`${baseUrl}/question/${quesId}`);
  }

  public updateQuestion(question:any){
    return this._client.put(`${baseUrl}/question/`,question)
  }

  public getQuestionsforQuiz(qId: any){
    return this._client.get(`${baseUrl}/question/quiz/${qId}`)
   }
}

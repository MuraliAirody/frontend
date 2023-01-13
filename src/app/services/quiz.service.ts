import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _client:HttpClient) { }

  public getQuizzes(){
     return this._client.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz: any){
    return this._client.post(`${baseUrl}/quiz/`,quiz)
  }

  public deleteQuiz(qId: any){
   return this._client.delete(`${baseUrl}/quiz/${qId}`);
  }

  public getQuiz(qId:any){
    return this._client.get(`${baseUrl}/quiz/${qId}`)
  }

  public updateQuiz(quiz:any){
    return this._client.put(`${baseUrl}/quiz/`,quiz);
  }
}

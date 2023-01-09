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
}

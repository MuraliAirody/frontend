import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _client:HttpClient) { }

  public categories(){
   return  this._client.get(`${baseUrl}/category/`)
  }

  public addCategory(category:any){
    return this._client.post(`${baseUrl}/category/`,category)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client:HttpClient) { 

  }

  public addUser(user: any){
    
   return this.client.post(`${baseUrl}/user/`,user)
  }
}

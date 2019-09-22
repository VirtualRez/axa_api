import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //VARIABLES
  httpOptions
  body: Object = {};
  apiResult;
  token;
  data;
  
  //FUNCTIONS
  Submit(mail) {//Login
    this.body = { email: mail }
    
    this._http.post('http://localhost:3000/login', this.body).subscribe(data => {
      this.apiResult = data;
      if (this.apiResult.message == "Ok") {
        switch (this.apiResult.role) {
          case "admin":
            localStorage.setItem('admin', `${this.apiResult.token}`)
            break;
          case "user":
            localStorage.setItem('user', `${this.apiResult.token}`)
            break;
          default:
            return;
        }
      }else{
        return;
      }
    });
  }
  searchUserName(userName) {//user serch by name
    return this._http.get(`http://localhost:3000/api/userName/${userName}`, this.setAuthHeader())
  }

  searchUserID(userID) {
    return this._http.get(`http://localhost:3000/api/userid/${userID}`, this.setAuthHeader())
  }
  //HEADER AUTORIZATION 
  setAuthHeader() {
    return this.httpOptions = { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }) }//Header application on angular7
  };

  constructor(private _router: Router, private _http: HttpClient) { }
}

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
  token: string;
  data;
  user;


  //FUNCTIONS
  Submit(mail) {//Login
    this.body = { email: mail }
    if (this.body['email'] == "undefined") {
      return true;
    };
    this._http.post('http://localhost:3000/login', this.body).subscribe(data => {
      this.apiResult = data;
      if (this.apiResult.message == "ok") {
        switch (this.apiResult.role) {
          case "admin":
            localStorage.setItem('admin', `${this.apiResult.token}`)
            this._router.navigateByUrl('/admin');
            break;
          case "user":
            localStorage.setItem('user', `${this.apiResult.token}`)
            this._router.navigateByUrl('/user');
            break;
          default:
            return;
        }
      } else {
        return true;
      }
    });
  }
  // reset() {//Cleaner
  //   this.failed = false;
  // }
  searchUserName(userName) {//user serch by name
    if (userName == "undefined") {
      return;
    } else {
      return this._http.get(`http://localhost:3000/api/userName/${userName}`, this.setAuthHeader())
        .toPromise().then(resp => { return resp }).catch(err => { return err });
    }
  }
  searchUserID(userID) {
    if (userID == "undefined") {
      return;
    } else {
      return this._http.get(`http://localhost:3000/api/userid/${userID}`, this.setAuthHeader())
        .toPromise().then(resp => { return resp }).catch(err => { return err });
    }
  }
  //CHECK TOKEN IN LOCAL STORAGE
  checkToken() {
    if (localStorage.getItem('user') == null) {
      return false
    } else {
      this.token = localStorage.getItem('user')//set the token on local storage
      return true
    }
  }
  //HEADER AUTORIZATION 
  setAuthHeader() {
    return this.httpOptions = { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }) }//Header application on angular7
  };

  constructor(private _router: Router, private _http: HttpClient) { }
}

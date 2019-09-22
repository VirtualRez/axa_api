import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
//VARIABLES
failed = false;
body: Object = {};
apiResult;

//FUNCTIONS
Submit(mail) {
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
reset() {
  this.failed = false;
}
  constructor(private _router: Router, private _http: HttpClient) { }
}

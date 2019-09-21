import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  failed = false;
  body: Object = {};
  apiResult;
  mail: String = "";

  Submit() {
    this.body = { email: this.mail }
    if (this.mail == "undefined") { return };
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
        this.failed = true;
        return;
      }
    });
  }

  reset() {
    this.failed = false;
  }
  constructor(private _http: HttpClient, private _user: UserService, private _router: Router) { }

  ngOnInit() {
  }


}




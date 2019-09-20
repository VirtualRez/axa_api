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
  body = { email: "" }
  constructor(private _http: HttpClient, private _user: UserService, private _router: Router) { }

  ngOnInit() {
  }
  sendData() {
    this._http.post("http://localhost:3000/login", this.body)
      .subscribe(apiResult => {
        if (Object.keys(apiResult)[0] == "admin") {
          this._router.navigateByUrl('/admin')
        } else if(Object.keys(apiResult)[0] == "user") {
          this._router.navigateByUrl('/user')
        }else{
        this.failed = true;
          return;
        }
      })



  }

   reset(){
   this.failed=false;
  }
}

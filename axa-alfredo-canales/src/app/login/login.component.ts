import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //VARIABLES
  failed = false;
  mail: string = "";
  //FUNCTION
  callSubmit() {
    if (this.mail == undefined) { this.failed = true; return; }
    if (this.mail.length == 0) { this.failed = true; return; }

    this._user.Submit(this.mail)
    .subscribe(data=> {
      if (data['message']=="Ok"){
        switch(data['role']){
          
            case "admin":
              localStorage.setItem('admin', `${data['token']}`)
              this._router.navigateByUrl('/admin')
              break;
            case "user":
              localStorage.setItem('user', `${data['token']}`)
              this._router.navigateByUrl('/user')
              break;
            default:
              return;
          }
        }else{
          this.failed=true;
        }
      
  });
}
  reset() {
    this.failed = false;
    return;
  }
  constructor(private _user: UserService, private _router: Router) { }

  ngOnInit() {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
  }


}




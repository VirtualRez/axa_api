import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

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
    this._user.Submit(this.mail) ? this.failed=true: this.failed =true;
  }
  constructor(private _user: UserService) { }


  ngOnInit() {
  }


}




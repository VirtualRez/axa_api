import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userID: string;
  userName: string;
  userExist = false;
  user: any;
  promiseVar;
  failedUser = false;
  failedId = false;

  SearchUserName() {
    if (this.userName == undefined) {//avoid error if you try to search if didn't write anything
      return;
    } else if (this.userName.length == 0) {//avoid error if you writed something, then you try to make a new search with no text
      return;
    } else {
      this.user = this._user.searchUserName(this.userName)
        .subscribe(res => {
          if (res['message'] !== 'Ok') {
            this.failedUser = true;
          } else {
            this.promiseVar = res;
            this.userExist = true;
          }
        })
    }
  }
  SearchUserID() {
    if (this.userID == undefined) {//avoid error if you try to search if didn't write anything
      return;
    } else if (this.userID.length == 0) {//avoid error if you writed something, then you try to make a new search with no text
      return;
    } else {
      this._user.searchUserID(this.userID)
      .subscribe(res => {
        console.log(res);
        
        if (res['message'] !== 'Ok') {
          this.failedId = true;
        } else {
          this.promiseVar = res;
          this.userExist = true;
        }
      })
    }
  }
  reset(){
    this.failedId=false;
    this.failedUser=false;
  }
  constructor(private _user: UserService) { }

  ngOnInit() {

  }

}

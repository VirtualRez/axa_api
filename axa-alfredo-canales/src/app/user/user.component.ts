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

  SearchUserName() {
    if (this.userName == undefined) {//avoid error if you try to search if didn't write anything
    return;
  } else if (this.userName.length == 0) {//avoid error if you writed something, then you try to make a new search with no text
    return;
    } else {
      this.user = this._user.searchUserName(this.userName)
      setTimeout(() => {
        this.promiseVar = this.user.__zone_symbol__value;
        if(this.promiseVar.message =="Ok"){
        this.userExist = true}
      }, 1000)
  }
  }
  SearchUserID() {
    if (this.userID == undefined) {//avoid error if you try to search if didn't write anything
    return;
  } else if (this.userID.length == 0) {//avoid error if you writed something, then you try to make a new search with no text
    return;
    }else{
      this.user = this._user.searchUserID(this.userID)
      setTimeout(() => {
        this.promiseVar = this.user.__zone_symbol__value;   
        if(this.promiseVar.message =="Ok"){
        this.userExist = true}
      }, 1000)
  }
  }
  constructor(private _user: UserService) { }

  ngOnInit() {
    this._user.checkToken();
  }

}

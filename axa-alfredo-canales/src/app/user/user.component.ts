import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userID: string;
  userName: string;
  data: any;
  httpOptions: any;
  token:string;

  setAuthHeader() {
    return this.httpOptions = { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }) }//Header application on angular7
  };

  searchUserID() {
    if (this.userID == "undefined") {
      return;
    } else {
      this._http.get(`http://localhost:3000/api/userid/${this.userID}`, this.setAuthHeader())
        .subscribe(apiResult => {
          this.data = apiResult;
          if (this.data.message == "Ok") {
            console.log(this.data);
          }else{
            console.log(this.data.message);
            
          }
        })
    }
  }

  searchUserName() {
    if (this.userName == "undefined") {
      return;
    } else {
      this._http.get(`http://localhost:3000/api/username/${this.userName}`, this.setAuthHeader())
        .subscribe(apiResult => {
          this.data = apiResult;
          if (this.data.message == "Ok") {
            console.log(this.data);
          }else{
            console.log(this.data.message);
            
          }
        })
    }
  }

  checkToken(){
    if(localStorage.getItem('user') == null){
     return false
    }else{
      this.token= localStorage.getItem('user')//set the token on local storage
      return true
    }
  }
  constructor(private _http: HttpClient, private _router: Router) { }

  ngOnInit() {
    this.checkToken();
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  haveUser = false;
  haveArray = false;
  token: string;
  user;
  userID: string;
  userName: string;
  policyId: string;
  uPolicies;
  data: any;
  httpOptions;
  arrayPol;
  fail1= false;
  fail2= false;
  fail3= false;
  fail4= false;
  setAuthHeader() {
    return this.httpOptions = { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }) }
  };

  searchUserName() {

    if (this.userName == undefined) {//solve error if you try to search if didn't write anything
      return;
    } else if (this.userName.length == 0) {//solve error if you writed something, then you try to make a new search with no text
      return;
    } else {
      this._http.get(`http://localhost:3000/api/userName/${this.userName}`, this.setAuthHeader())
        .subscribe(result => {
          this.data = result
          if (this.data.message == "Ok") {
            this.user = this.data;
            this.haveUser = true;
          } else {
            this.fail1= true;
          }
        });
    }
  }

  searchUserID() {
    if (this.userID == undefined) {//solve error if you try to search if didn't write anything
      return;
    } else if (this.userID.length == 0) {//solve error if you writed something, then you try to make a new search with no text
      return;
    } else {

      this._http.get(`http://localhost:3000/api/userID/${this.userID}`, this.setAuthHeader())
        .subscribe(result => {
          this.data = result;
          if (this.data.message == "Ok") {
            this.user = this.data;
            this.haveUser = true;
          } else {
            this.fail2= true;
          }
        })
    }

  }

  seUspol() {//ARRAY
    if (this.uPolicies == undefined) {//solve error if you try to search if didn't write anything
      return;
    } else if (this.uPolicies.length == 0) {//solve error if you writed something, then you try to make a new search with no text
      return;
    } else {
      this._http.get(`http://localhost:3000/api/admin/policies/${this.uPolicies}`, this.setAuthHeader())
        .subscribe(apiResult => {
          this.data = apiResult;
          if (this.data.message == undefined) {
            this.arrayPol = this.data;
            this.haveArray = true;
          } else {
            this.fail3= true;
          }
        })
    }
  }

  seByPolId() {
    if (this.policyId == undefined) {//solve error if you try to search if didn't write anything
      return;
    } else if (this.policyId.length == 0) {//solve error if you writed something, then you try to make a new search with no text
      return;
    } else {
      this._http.get(`http://localhost:3000/api/admin/user/${this.policyId}`, this.setAuthHeader())
        .subscribe(result => {
          this.data = result;
          if (this.data.message == undefined) {
            this.user = result;
            this.haveUser = true;
          } else {
            this.fail4= true;
          }
        })
    }
  }


  checkToken() {
    if (localStorage.getItem('admin') == null) {
      return false
    } else {
      this.token = localStorage.getItem('admin')
      return true
    }
  }
  reset() {
    this.fail1= false;
    this.fail2= false;
    this.fail3= false;
    this.fail4= false;
    return;
  }
  constructor(private _http: HttpClient) {
    if (this.uPolicies == undefined) {
      return;
    } else {
      this._http.get(`http://localhost:3000/api/admin/policies/${this.uPolicies}`, this.setAuthHeader()).subscribe(result => {
        this.data = result
        if (this.data.message == undefined) {
        } else { console.log(this.data.message) }
      });
    }

    if (this.policyId == undefined) {
      return;
    } else {
      this._http.get(`http://localhost:3000/api/admin/user/${this.policyId}`, this.setAuthHeader()).subscribe(result => {
        this.data = result
        if (this.data.message == undefined) {
          this.haveUser = true;
        } else { console.log(this.data.message) }
      });
    }
  }


  ngOnInit() {
    this.checkToken()
  }

}
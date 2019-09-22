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

  setAuthHeader() {
    return this.httpOptions = { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }) }
  };

  searchUserName() {

    if (this.userName == undefined) {
      return;
    } else {
      this._http.get(`http://localhost:3000/api/userName/${this.userName}`, this.setAuthHeader()).subscribe(result => {
        this.data = result
        if (this.data.message == "Ok") {
          this.user = this.data;
          this.haveUser = true;
        } else {
          console.log(this.data.message)
        }
      });

    }
  }

  searchUserID() {
    if (this.userID == undefined) {
      return;
    } else {

      this._http.get(`http://localhost:3000/api/userID/${this.userID}`, this.setAuthHeader()).subscribe(result => {
        this.data = result;
        if (this.data.message == "Ok") {
          this.user = this.data;
          this.haveUser = true;
        } else {
          console.log(this.data.message)
        }
      })
    }

  }

  seUspol() {
    if (this.uPolicies == undefined) {
      return;
    }else{
    this._http.get(`http://localhost:3000/api/admin/policies/${this.uPolicies}`, this.setAuthHeader())
      .subscribe(apiResult => {
        this.data = apiResult;
        console.log(apiResult);

        if (this.data.message == undefined) {

          this.arrayPol = this.data;
          this.haveArray = true;

        } else {
          console.log(this.arrayPol.message)//return array
        }
      })
    }
  }

  seByPolId() {
    if (this.policyId == "undefined") {
      return;
    } else {
      this._http.get(`http://localhost:3000/api/admin/user/${this.policyId}`, this.setAuthHeader())
        .subscribe(result => {
          this.data = result;
          if (this.data.message == undefined) {
            this.user = result;
            this.haveUser = true;
          } else {
            console.log(this.data.message)
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
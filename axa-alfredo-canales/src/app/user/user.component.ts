import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
userID : string;
userName : string;
data : any;

searchUserID(){//////////ESTAMOS AQUÍ, TENEMOS QUE METER EL TOKEN
if(this.userID.length == 0){
  return;
}else{
  this._http.get(`http://localhost:3000/api/userid/${this.userID}`)
  .subscribe(apiResult =>{
    this.data = apiResult;
    if(this.data.message == "Ok" ){
     console.log(this.data);
     
    }
  })
}
}

searchUserName(){

}
  constructor(private _http: HttpClient) { }

  ngOnInit() {
  }

}

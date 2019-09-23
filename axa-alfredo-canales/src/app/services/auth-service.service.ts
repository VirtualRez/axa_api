import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 
  islogged() {
    if (localStorage.getItem('user') !== null) {
      return true;
    }
  }
  isAdmin() {
    if (localStorage.getItem('admin') !== null) {
      return true
    }
  }

  constructor() { }
}

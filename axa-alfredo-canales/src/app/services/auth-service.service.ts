import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  token;

  islogged() {
    if (localStorage.getItem('user') || localStorage.getItem('admin') !== null) {
      return true;
    }
  }

  constructor() { }
}

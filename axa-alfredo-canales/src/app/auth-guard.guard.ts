import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './services/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  canActivate() {
    if (this._auth.islogged()) {
      return true;
    } else {
      return false;
    }
  }

  constructor(public _auth: AuthServiceService) {

  }
}

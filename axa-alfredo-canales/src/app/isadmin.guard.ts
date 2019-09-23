import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class IsadminGuard implements CanActivate {

  canActivate() {
    if (this._auth.isAdmin()) {
      return true;
    } else {
      return false;
    }
  }

  constructor(private _auth: AuthServiceService) {

  }
}
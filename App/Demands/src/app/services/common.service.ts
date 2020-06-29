import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private isAreaAdmin: boolean = false

  constructor() { }

  setAdmin() {
    this.isAreaAdmin = true
  }

  setNotAdmin() {
    this.isAreaAdmin = false
  }

  isAdmin() {
    return this.isAreaAdmin
  }  
}

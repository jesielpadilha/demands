import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/services/authentication.service';
@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (!this.authService.isAuthenticated()) return this.router.parseUrl('/authentication/login')

        let loggedUser = this.authService.getAuthenticatedUser()
        return loggedUser != null && loggedUser.type === 1
            ? true
            : this.router.parseUrl('/home')
    }
}
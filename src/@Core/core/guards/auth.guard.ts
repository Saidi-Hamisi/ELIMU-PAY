import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../../Authservice/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // const userRoles = this.tokenStorage.getUserRoles();

    // if (userRoles.length === 0) {
    //   this.router.navigate(['/authentication/signin']);
    //   return false;
    // }

    // if (route.data['roles'] && !this.hasRequiredRoles(route.data['roles'], userRoles)) {
    //   this.router.navigate(['/page-error404']); // Redirect to page-error404 on unauthorized access
    //   return false;
    // }

    return true;
  }

  private hasRequiredRoles(requiredRoles: string[], userRoles: string[]): boolean {
    // Check if any of the user's roles match the required roles for the route
    return userRoles.some(role => requiredRoles.includes(role));
  }
}

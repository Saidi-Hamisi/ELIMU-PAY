import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const THEME_KEY = 'theme';
const SCHOOL_NAME_KEY = 'school_name';
const ROLES_KEY = 'user-roles'; // New key for roles

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(ROLES_KEY); // Clear roles
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveSchoolName(schoolName: string): void { // Parameter name updated for clarity
    window.localStorage.removeItem(SCHOOL_NAME_KEY);
    window.localStorage.setItem(SCHOOL_NAME_KEY, schoolName);
  }

  public getSchoolName(): string | null {
    return window.localStorage.getItem(SCHOOL_NAME_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public saveTheme(theme: any): void {
    console.log("Saving theme");
    console.log(theme);
    window.localStorage.removeItem(THEME_KEY);
    window.localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  }

  public getTheme(): any {
    const theme = window.localStorage.getItem(THEME_KEY);
    console.log("Getting theme");
    console.log(theme);
    if (theme) {
      return JSON.parse(theme);
    }
    return null;
  }

  // New methods for handling roles
  public saveRoles(roles: string[]): void {
    window.localStorage.removeItem(ROLES_KEY);
    window.localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
  }

  public getUserRoles(): string[] {
    const roles = window.localStorage.getItem(ROLES_KEY);
    return roles ? JSON.parse(roles) : [];
  }
}

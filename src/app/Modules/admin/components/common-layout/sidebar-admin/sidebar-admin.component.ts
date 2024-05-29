import { Component, Input, Output } from '@angular/core';


@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent {
  @Input() sidebarOpen: boolean = false
  // @Output() sidebarClosed: boolean = false
  toggle() {
    throw new Error('Method not implemented.');
  }
  
  isHidden1=true
  isHidden=true
  isHidden2=true
  isHidden3=true
  isHidden4=true
  isHidden5=true
  isHidden6=true
  isHidden9=true
  ;
isHidden10: any;
isHidden11: any;
  tokenService: any;
  role: any;
  username: any;
  email: any;
  authorized: boolean | undefined;


  closeNav1(){
    this.isHidden1=!this.isHidden1

  }
  closeNav3(){
    this.isHidden6=!this.isHidden6

  }
  closeNav(){
    this.isHidden=!this.isHidden

  }
  closeNavS(){
    this.isHidden9=!this.isHidden9

  }
  closeNav2(){
    this.isHidden2=!this.isHidden2

  }
  closeExpenses(){
    this.isHidden4=!this.isHidden4
  }

  closeIncome(){
    this.isHidden3=!this.isHidden3
  }
  closeReports(){
    this.isHidden5=!this.isHidden5
  }
  closeSystemManagement(){
    this.isHidden10=!this.isHidden10
  }
  closeAccessmanagement(){
    this.isHidden11=!this.isHidden11
  }
  Authorize() {
    let currentUser = this.tokenService.getUser();
    this.role = currentUser.roles[0].name;
    this.username = currentUser.username
    this.email = currentUser.email

    if (this.role == "SUPERUSER") {
      this.authorized = true;
    }

    if (this.role == "TELLER") {
      this.authorized = false;
    }
    if (this.role == "USER") {
      this.authorized = false;
    }
  }
  ngOnInit(){
    this.role ='admin'
    console.log('jaba')
  }
}

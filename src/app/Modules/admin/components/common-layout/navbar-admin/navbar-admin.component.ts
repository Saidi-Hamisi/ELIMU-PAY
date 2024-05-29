import { Component, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swal from "sweetalert2";
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

const document: any = window.document;


@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {



  @Output() toggleSidebarEvent = new EventEmitter<void>();
  isFullScreen: boolean = false
  drawer: any;
  userName: any;

  constructor(private router: Router) {}



  toggleSidebar(): void {
    this.toggleSidebarEvent.emit();
  }


  logout(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to Exit?',
      showCancelButton: true,
      confirmButtonText: 'Yes, exit!',
      cancelButtonText: 'Cancel',
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        
          console.log("got hereeeeeeeeee")
        this.router.navigate(["/auth/login"]);

          
          () => {
            Swal.fire({
              icon: 'error',
              title: 'Error attempting to logOut',
              text: 'An error occurred while attempting to logOut.',
            });
          }
            }
    });
  
}


callFullscreen() {
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    }

    this.isFullScreen  = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  this.isFullScreen = false
}

}


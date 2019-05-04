import {Component} from '@angular/core';
import {Book} from "./shared/book";
import {AuthService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  /*template: ` <bs-book-list *ngIf="listOn" (showDetailsEvent)="showDetails($event)"></bs-book-list>
   <bs-book-details *ngIf="detailsOn" (showListEvent)="showList()" [book]="book"></bs-book-details>`,*/
  styles: []
})

/**
 * Hauptkomponent aus dem alles gestartet wird
 *
 */
export class AppComponent {
  constructor(private authService: AuthService) {

  }

  isAdmin(){
    return this.authService.isAdmin();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel() {
    if (this.isLoggedIn()) {
      return "Logout"
    } else {
      return "Login"
    }
  }
}

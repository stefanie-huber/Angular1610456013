import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../shared/book";

@Component({
  selector: 'bs-home',
  template: `
    <div class="ui grid">
      <div class="ui container" style="margin-top: 20px;">
        <h1>Willkommen in meinem Bookstore!</h1>
        <p>Viel Spaß beim Durchstöbern</p>
        <div class="floated right">
          <bs-search class="column" (bookSelected)="bookSelected($event)"></bs-search>
        </div>

        <a routerLink="../books" class="ui big olive button" style="margin:20px 0 50px 0">
          Buchliste ansehen
          <i class="right arrow icon"></i>
        </a>

        
        
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  bookSelected(book: Book) {
    this.router.navigate(['../books', book.isbn]);
  }
}

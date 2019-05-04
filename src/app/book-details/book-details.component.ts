import {Component, OnInit} from '@angular/core';
import {Book} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookFactory} from "../shared/book-factory";
import {AuthService} from "../shared/authentication.service";


@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})


export class BookDetailsComponent implements OnInit {

  //welches Buch ausgewählt wird, kommt von außen mit (durch klick)
  book: Book = BookFactory.empty();
  value: any;
  savedBooks = [];


  constructor(private bs: BookStoreService,
              private route: ActivatedRoute,
              private router: Router,
              public authService: AuthService) {
  }


  ngOnInit() {
    const params = this.route.snapshot.params;
    //das sind die parameter unserer route
    this.bs.getSingle(params['isbn']).subscribe(b => this.book = b);
  }

  getRating(num: number) {
    return new Array(num);
  }

  changeToComma(price) {
    this.value = price.toFixed(2);
    this.value = this.value.toString().replace('.', ',');

  }


  removeBook() {
    if (confirm('Buch wirklich löschen?')) {
      this.bs.remove(this.book.isbn).subscribe(
        res => this.router.navigate(['../'], {relativeTo: this.route})
      )
    }
  }

  saveToCart(id) {
    if (localStorage.getItem("book_"+this.authService.getCurrentUserId()) != null){
      this.savedBooks =JSON.parse(localStorage.getItem("book_"+this.authService.getCurrentUserId()));
    }
    this.savedBooks.push(id);
    localStorage.setItem("book_"+this.authService.getCurrentUserId(), JSON.stringify(this.savedBooks));

  }

}

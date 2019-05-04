import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {distinct, debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/internal/operators";
import {BookStoreService} from "../shared/book-store.service";
import {Author, Book} from "../shared/book";

@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  constructor(private bs: BookStoreService) {
  }

  isLoading = false;
  keyup = new EventEmitter<string>();
  foundBooks: Book[] = [];
  foundAuthors: Author[] = [];
  @Output() bookSelected = new EventEmitter<Book>()

  //hier schmeiß ma a event, wenn er was gefunden hat

  ngOnInit() {
    this.keyup.pipe(debounceTime(500)).pipe(distinctUntilChanged()).pipe(switchMap(searchTerm => this.bs.getAllSearch(searchTerm))).pipe(tap(() => this.isLoading = true)).subscribe((books) => {

      this.foundBooks = books;
      console.log(this.foundBooks, this.foundAuthors)
    });


    //jetzt subscribe ma uns auf den eventemitter
    //nur wenn der benutzer 500ms lange nix eingibt wirds erst weitergeleitet
  }

}

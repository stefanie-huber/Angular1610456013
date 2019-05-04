import {ActivatedRoute, Router} from '@angular/router';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {distinct, debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/internal/operators";
import {BookFormErrorMessages} from './book-form-error-messages';
import {BookFactory} from "../shared/book-factory";
import {BookStoreService} from "../shared/book-store.service";
import {Author, Book, Image} from "../shared/book";
import {BookValidatorsService} from "../shared/book-validators.service";

@Component({
  selector: 'bs-book-form',
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  author3 = [];
  book = BookFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingBook = false;
  images: FormArray;
  author: FormArray;

  constructor(private fb: FormBuilder, private bs: BookStoreService,
              private route: ActivatedRoute, private router: Router) {

  }

  isLoading = true;
  keyup = new EventEmitter<string>();
  foundAuthors: Author[] = [];
  @Output() authorSelected = new EventEmitter<Author>();


  //der formbuilder stellt mir praktische methoden zur Verfügung

  ngOnInit() {
    const isbn = this.route.snapshot.params['isbn'];
    if (isbn) {
      this.isUpdatingBook = true;
      this.bs.getSingle(isbn).subscribe(book => {
        this.book = book;
        this.initBook();
      });
    }
    this.initBook();

    this.keyup.pipe(debounceTime(500)).pipe(distinctUntilChanged())
      .pipe(switchMap(searchTerm => this.bs.getAuthorsSearch(searchTerm)))
      .pipe(tap(() => this.isLoading = false)).subscribe((authors) => {
      this.foundAuthors = authors;
      console.log(this.foundAuthors)
    });


  }

  initBook() {
    this.buildThumbnailsArray();

    this.bookForm = this.fb.group({
      id: this.book.id,
      title: [this.book.title, Validators.required],
      subtitle: this.book.subtitle,
      price: [this.book.price, [
        Validators.required,
        Validators.pattern(/^[0-9]+(.[0-9]{0,2})?$/)]
      ],
      isbn: [this.book.isbn, [
        Validators.required,
        //Validators.minLength(10),
        //Validators.maxLength(13)
        BookValidatorsService.isbnFormat
      ]],
      description: this.book.description,
      rating: [this.book.rating, [
        Validators.min(0),
        Validators.max(10)
      ]],
      authors: this.author3,
      images: this.images,
      published: new Date(this.book.published)
    });
    this.bookForm.statusChanges.subscribe(
      () => this.updateErrorMessages());
  }

  searchAuthor(author) {
    (<HTMLInputElement>document.getElementById("insertName")).value = author.firstName + ' ' + author.lastName;
    this.author3.push(author)
    console.log(this.author3);
    document.getElementById("results").style.opacity = "0";
  }

  buildThumbnailsArray() {
    console.log(this.book.images);
    console.log("Autoren im thumbnail" + this.book.authors);
    //if (this.book.images.length == 0) { //if new book had no images -> but no in edit mode
    //this.book.images.push(new Image(0, '', ''))
    //}
    this.images = this.fb.array(
      this.book.images.map(
        t => this.fb.group({
          id: this.fb.control(t.id),
          url: this.fb.control(t.url),
          title: this.fb.control(t.title)
        })
      ), BookValidatorsService.atLeastOneImage
    );

    console.log(this.images);
  }

  addThumbnailControl() {
    this.images.push(this.fb.group({url: null, title: null}));
  }

  removeThumbnailControl(index) {
    this.images.removeAt(index);
  }

  submitForm() {
    // filter empty values
    this.bookForm.value.images = this.bookForm.value.images.filter(thumbnail => thumbnail.url);

    const book: Book = BookFactory.fromObject(this.bookForm.value);
//deep copy  - did not work without??
    book.images = this.bookForm.value.images;

    //just copy the authors
    book.authors = this.author3;

    if (this.isUpdatingBook) {
      this.bs.update(book).subscribe(res => {
        this.router.navigate(['../../books', book.isbn], {relativeTo: this.route});
      });
    } else {
      book.user_id = 1;// just for testing
      console.log(book)
      this.bs.create(book).subscribe(res => {
        this.book = BookFactory.empty();
        this.bookForm.reset(BookFactory.empty());
        this.router.navigate(['../books'], {relativeTo: this.route});
      });
    }
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of BookFormErrorMessages) {
      const control = this.bookForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] && !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
      //dirty - er hat schon etwas geändert im Formular
      //invalid - wenn'S nicht passt
      //wenn dirty und invalid zutreffen - fehlermeldung anziegen
    }
  }
}

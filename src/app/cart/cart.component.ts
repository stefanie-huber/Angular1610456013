import {Component, OnInit} from '@angular/core';
import {Book} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import {AuthService} from "../shared/authentication.service";
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from "../shared/order";
import {OrderFactory} from "../shared/order-factory";

@Component({
  selector: 'bs-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {

  constructor(private bs: BookStoreService,
              public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  savedBooks = [];
  amountItems = [];
  books: Book[];
  array = [];
  test = [];
  shownBooks = [];
  order = OrderFactory.empty();

  ngOnInit() {
    this.bs.getAll().subscribe(res => this.books = res);
    this.savedBooks = JSON.parse(localStorage.getItem("book_" + this.authService.getCurrentUserId()));


  }

  deleteFromCart(isbn) {
    this.array = JSON.parse(localStorage.getItem("book_" + this.authService.getCurrentUserId()));
    localStorage.removeItem('book_' + this.authService.getCurrentUserId());
    this.savedBooks = [];

    let removedIndx = this.array.indexOf(isbn);
    while (removedIndx > -1) {
      this.array.splice(removedIndx, 1);
      removedIndx = this.array.indexOf(isbn);
    }

    localStorage.setItem("book_" + this.authService.getCurrentUserId(), JSON.stringify(this.array));
    this.savedBooks = this.array;
    this.shownBooks = [];
  }


  count(isbn) {
    this.test = JSON.parse(localStorage.getItem("book_" + this.authService.getCurrentUserId()));

    let amount = 0;
    for (let i = 0; i < this.test.length; ++i) {
      if (this.test[i] == isbn)
        amount++;
    }

    return amount;

  }


  amountItem(value) {
    this.amountItems = JSON.parse(localStorage.getItem("amount"));
    console.log("amount: " + this.amountItems);
    this.amountItems.push(value);
    localStorage.setItem("book_" + this.authService.getCurrentUserId(), JSON.stringify(this.savedBooks));

  }


  pushToCart(isbn) {
    this.shownBooks.push(isbn);
  }

  increaseAmount(isbn) {
    this.shownBooks = JSON.parse(localStorage.getItem("book_" + this.authService.getCurrentUserId()));
    this.savedBooks.push(isbn);
    localStorage.setItem("book_" + this.authService.getCurrentUserId(), JSON.stringify(this.savedBooks));
    this.shownBooks = [];
    console.log(this.savedBooks);

  }

  decreaseAmount(isbn) {
    this.shownBooks = JSON.parse(localStorage.getItem("book_" + this.authService.getCurrentUserId()));
    for (let i = 0; i < this.savedBooks.length; i++) {
      if (this.savedBooks[i] == isbn) {
        this.savedBooks.splice(i, 1);
        localStorage.setItem("book_" + this.authService.getCurrentUserId(), JSON.stringify(this.savedBooks));
        this.shownBooks = [];
        break;
      }
    }

  }

  checkLogin() {
    if (this.authService.isLoggedIn()) {
      this.save();

    } else {
      this.router.navigate(['/login']);
    }
  }

  save() {
    //save book with current user id in local storage
    this.savedBooks = JSON.parse(localStorage.getItem("book_" + this.authService.getCurrentUserId()));

    let price = 0;
    let bookIds = [];


    for (let i = 0; i < this.books.length; i++) {
      for (let j = 0; j < this.savedBooks.length; j++) {
        if (this.books[i].isbn == this.savedBooks[j]) {
          price += this.books[i].price;
          bookIds.push(this.books[i]);
        }
      }
    }

    console.log(bookIds);
    const order: Order = OrderFactory.fromObject(1, price, 1, this.authService.getCurrentUserId(), bookIds, '');
    this.bs.createOrder(order).subscribe(res => {
      this.order = OrderFactory.empty();
      localStorage.removeItem("book_" + this.authService.getCurrentUserId());
      this.router.navigate(['../order'], {relativeTo: this.route});
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {Book} from "../shared/book";
import {AuthService} from "../shared/authentication.service";
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from "../shared/order";
import {OrderFactory} from "../shared/order-factory";
import {BookStoreService} from "../shared/book-store.service";
import {OrderlogFactory} from "../shared/orderlog-factory";
import {Orderlog} from "../shared/orderlog"; //reinimportieren, damit ich die Methode getOrders aufrufen kann

@Component({
  selector: 'bs-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  constructor(private bs: BookStoreService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  orders = [];
  currentUser: any;
  firstName: any;
  netPrice: any;
  viewedBooks = [];
  isAdmin: any;
  orderlog = OrderlogFactory.empty();

  //stateValue: any;

  ngOnInit() {
    //alle Orders reinholen
    this.bs.getOrders().subscribe(res => this.orders = res);

    //aktuellen User holen
    this.currentUser = this.authService.getCurrentUserId();

    this.isAdmin = JSON.parse(localStorage.getItem("is_admin"));


  }

  getNetPrice(grossPrice) {
    return (this.netPrice = grossPrice / 100 * 90).toFixed(2);
  }

  /*deciPrice(price) {
    return (price).toFixed(2);
  }*/

  push(isbn) {
    this.viewedBooks.push(isbn);
  }

  clear() {
    this.viewedBooks = [];
  }

  count(books, isbn) {
    let amount = 0;
    for (let i = 0; i < books.length; ++i) {
      if (books[i].isbn == isbn)
        amount++;
    }

    return amount;
  }

  changeState(comment, order): void {
    console.log("Kommentar: " + comment);
    order.comment = comment;
    console.log(order);
    console.log("order.comment wird zu: " + order.comment);
    this.bs.updateState(order).subscribe(res => {
    });
    location.reload();

  }


  onChange(event, order): void {  // event will give you full brief of action
    let newState;
    console.log("Event: " + event);

    switch (event) {
      case "Offen":
        newState = 1;
        break;
      case "Bezahlt":
        newState = 2;
        break;
      case "Versendet":
        newState = 3;
        break;
      case "Storniert":
        newState = 4;
        break;
      default:
        newState = 1;
        break;
    }

    console.log("Status: " + newState);
    //const orderlog: Orderlog = OrderlogFactory.fromObject(null, event, 1);
    order.state = newState;
    console.log(order);
    //this.bs.updateState(order).subscribe(res => {
    //});
  }
}

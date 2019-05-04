import {Injectable} from '@angular/core';
import {Author, Book, Image} from './book';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Order} from "./order";
import {Orderlog} from "./orderlog";

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = "http://bookstore19.s1610456013.student.kwmhgb.at/api";

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Book>> {
    return this.http.get(`${this.api}/books`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //alle Orders abrufen
  getOrders(): Observable<Array<Order>> {
    return this.http.get(`${this.api}/orders`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(isbn): Observable<Book> {
    return this.http.get(`${this.api}/book/${isbn}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSearch(searchTerm: string): Observable<Array<Book>> {
    return this.http
      .get(`${this.api}/book/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAuthorsSearch(searchTerm: string): Observable<Array<Author>> {
    return this.http.get(`${this.api}/author/search/${searchTerm}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(book: Book): Observable<any> {
    //das create bekommt a buch objekt mit und gibt mir a observable mit irgendeinem datensatz zurück
    return this.http.post(`${this.api}/book`, book).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createOrder(order: Order): Observable<any> {
    console.log("create Order wird aufgerufen");
    //das create bekommt a border objekt mit und gibt mir a observable mit irgendeinem datensatz zurück
    return this.http.post(`${this.api}/order`, order).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateState(order: Order): Observable<any> {
    return this.http.put(`${this.api}/order/${order.id}`, order).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  update(book: Book): Observable<any> {
    return this.http.put(`${this.api}/book/${book.isbn}`, book).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(isbn: String): Observable<any> {
    return this.http.delete(`${this.api}/book/${isbn}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}

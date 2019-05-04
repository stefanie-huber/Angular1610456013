import {Injectable} from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpEvent} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //http request muss an einen server geschickt werden. der interceptor wird dazwischen geschickt
    //zurück kommt a observable vom typ httpEvent

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return next.handle(request);
    //

  }

  constructor() {
  }
}

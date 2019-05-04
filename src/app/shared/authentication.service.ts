import {Injectable} from '@angular/core';
import {isNullOrUndefined} from "util";
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';
import {retry} from 'rxjs/operators';

//npm install --save-dev jwt-decode

interface User {
  result: {
    created_at: Date,
    email: string,
    id: number,
    name: string,
    updated_at: Date
  }
}

@Injectable()
export class AuthService {

  private api: string = 'http://bookstore19.s1610456013.student.kwmhgb.at/api/auth';//'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {'email': email, 'password': password});
  }

  public setCurrentUserId() {
    this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res => {
        localStorage.setItem('userId', res.result.id.toString());
      }
    );
  }

  public getCurrentUserId() {
    return Number.parseInt(localStorage.getItem('userId'));
  }

  public setLocalStorage(token: string) {
    //token wird mitgegeben
    //token wird decodiert
    //userobjekt kommt zurück
    //setItem: beim token den ganzen token speichern
    //setItem: bei userId die ganze Id mitschicken
    //für HÜ falg mitspeichern: is admin true
    //.isAdmin dann hier
    //oben beim interface muss ich das auch angeben
    //???? whaaat
    console.log("Storing token");
    console.log(token);
    const decodedToken = decode(token);
    console.log('decodeToken: ' + decodedToken);
    console.log('user id: ' + decodedToken.user.id);
    console.log('is admin: ' + decodedToken.user.is_admin);
    localStorage.setItem('is_admin', decodedToken.user.is_admin);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', decodedToken.user.id);
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    console.log("logged out");
  }

  public isLoggedIn() {
    return !isNullOrUndefined(localStorage.getItem("token"));
  }

  /*public isLoggedIn() {
    if(!isNullOrUndefined(localStorage.getItem("token"))){
      let token : string  = localStorage.getItem("token");
      const decodedToken = decode(token);
      let expirationDate:Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if(expirationDate < new Date()){
        console.log("token expired");
        localStorage.removeItem("token");
        return false;
      }
      return true;
    } else {
      return false;
    }
  }*/

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  public isAdmin() {
    //get token information from local storage
    if (!isNullOrUndefined(localStorage.getItem("token"))) {
      let token: string = localStorage.getItem("token");
      const decodedToken = decode(token);
      return decodedToken.user.is_admin;
    }
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from ".././shared/authentication.service";


interface Response {
  response: string;
  //das ist ein interface definiert
  //für HÜ muss das interface erweitert werden
  result: {
    token: string;
  };
}

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(res => {
        const resObj = res as Response;
        //result auf ein response objekt casten
        if (resObj.response === "success") {
          this.authService.setLocalStorage(resObj.result.token);
          //setLocalstorage -> ich speichere den token ins lokal storage
          //damit ich ihn nicht global ablegen muss
          //am client im local storage is besser (direkt am browser)
          //von dort kann ich ihn jederzeit wieder holen
          //könnt ich auch in einen service speichern mit getter
          this.router.navigateByUrl('/');
          //auf startseite navigieren
        }
      });
    }
  }


  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}

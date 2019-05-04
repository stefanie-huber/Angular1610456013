/**
 * Created by Stefanie on 18.03.2019.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {BookListComponent} from "./book-list/book-list.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {BookFormComponent} from "./book-form/book-form.component";
import {LoginComponent} from "./login/login.component";
import {CartComponent} from "./cart/cart.component";
import {OrderComponent} from "./order/order.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'books', component: BookListComponent},
  {path: 'books/:isbn', component: BookDetailsComponent},
  {path: 'admin', component: BookFormComponent}, //neu anlegen
  {path: 'admin/:isbn', component: BookFormComponent}, //editieren
  {path: 'login', component: LoginComponent}, //editieren
  {path: 'cart', component: CartComponent},
  {path: 'order', component: OrderComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule{

}

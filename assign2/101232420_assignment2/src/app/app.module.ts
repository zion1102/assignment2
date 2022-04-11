import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ListingsComponent } from './listings/listings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListingListComponent } from './listing-list/listing-list.component';
import { MakebookingComponent } from './makebooking/makebooking.component';
import { BookingsComponent } from './bookings/bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    ListingsComponent,
    UsersComponent,
    LoginComponent,
    NavbarComponent,
    ListingListComponent,
    MakebookingComponent,
    BookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

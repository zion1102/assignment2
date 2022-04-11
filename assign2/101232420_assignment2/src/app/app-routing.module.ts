import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingsComponent } from './listings/listings.component';
import { UsersComponent } from './users/users.component';
import {LoginComponent} from './login/login.component'
import { ListingListComponent } from './listing-list/listing-list.component';
import { MakebookingComponent } from './makebooking/makebooking.component';
import {BookingsComponent} from './bookings/bookings.component'


const routes: Routes = [ { path: '', redirectTo: 'login', pathMatch: 'full'},
{ path: 'listings', component: ListingsComponent},
{ path: 'users', component: UsersComponent},
{ path: 'login', component: LoginComponent},
{ path: 'listingList', component: ListingListComponent},
{ path: 'makeBooking', component: MakebookingComponent},
{ path: 'bookings', component: BookingsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

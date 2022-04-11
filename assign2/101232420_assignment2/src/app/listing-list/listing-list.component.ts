import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Apollo, gql } from 'apollo-angular';
import { getListingByUser, getListings } from '../graphql/graphql.queries';
@Component({
  selector: 'app-listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.css']
})
export class ListingListComponent implements OnInit {
  listings: any[] = []
  listing:any[]=[]
  loading = true;
  error: any;

  user=JSON.parse(localStorage.getItem('user')||'[]')

  makeListing(){
    this.router.navigate(['listings']);
  }
  makeBooking(listingId: String){
    const GETLISTING=gql`
    query GetListing($listingId: String!) {
      getListing(listingId: $listingId){
        listingId
        listingTitle
        description
        street
        city
        postalCode
        price
        email
        username
      }
    }`
    this.apollo.watchQuery({query: GETLISTING, variables: {"listingId": listingId}})
    .valueChanges.subscribe((res: any)=>{
      console.log(res.data)
      this.listing = res?.data?.getListing;
      this.loading= res.loading;
      this.error = res.error
      console.log(this.listing)
      if(this.listing != null){
        localStorage.setItem('listing', JSON.stringify(this.listing))
        this.router.navigate(['makeBooking']);
      }
    
  })
}

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
    if(this.user.type =="admin")
  {  this.apollo.watchQuery({query: getListingByUser, variables:{"email":this.user.email}})
    .valueChanges.subscribe((res: any)=>{
      console.log(res.data)
      this.listings = res?.data?.getListingByUser;
      this.loading= res.loading;
      this.error = res.error
     
      console.log(this.user.type)
    })} else{
     
     
      this.apollo.watchQuery({query: getListings,})
    .valueChanges.subscribe((res: any)=>{
      console.log(res.data)
      this.listings = res?.data?.getListings;
      this.loading= res.loading;
      this.error = res.error
     
      console.log(this.user.type)

    })}


   
  }

 
}

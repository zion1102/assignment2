import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Apollo, gql } from 'apollo-angular';
import { getListingByUser } from '../graphql/graphql.queries';


@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  listings: any[] = []
  loading = true;
  error: any;

  user=JSON.parse(localStorage.getItem('user')||'[]')

  listingForm = new FormGroup({
    listingId: new FormControl(),
    listingTitle: new FormControl(),
    email: new FormControl(),
    description: new FormControl(),
    city: new FormControl(),
    country: new FormControl(),
    street: new FormControl(),
    postalCode:new FormControl(),
    price:new FormControl(),
    username:new FormControl(),
    
  })
  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  createListing(ld: string, lt:string,d:string,c:string,s:string,pc:string,p:number){
    const ADDLISTING=gql`
    mutation AddListing($ld:String!, $lt: String!, $d: String!, $c: String!,
      $s: String!, $pc: String!, $p: Float!, $e: String!,
      $u: String!) {
      addListing(listingId: $ld, listingTitle:$lt, description:$d, city:$c,
        street:$s, postalCode:$pc, price:$p, email:$e,
        username:$u){
          
          username
        
      }
    }`
    return this.apollo.mutate ({
      mutation: ADDLISTING,
      variables:{
        ld: ld,
        lt:lt,
        d:d,
        c:c,
        s:s,
        pc:pc,
        p:p,
        e:this.user.email,
        u:this.user.username
      }

    }).subscribe(({data}) =>{
      console.log(data)
       this.router.navigate(['listingList']);
    },(err)=>{
      console.log(err)
    })
  }


  onSubmit(){
    var data = [];
    console.log(this.listingForm.value);
    data = this.listingForm.value
    this.createListing(data.listingId, data.listingTitle,data.description,data.city,data.street,
      data.postalCode,
      data.price)
     
      this.ngOnInit();
 
  }


}

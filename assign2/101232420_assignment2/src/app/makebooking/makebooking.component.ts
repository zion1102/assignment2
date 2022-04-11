import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-makebooking',
  templateUrl: './makebooking.component.html',
  styleUrls: ['./makebooking.component.css']
})
export class MakebookingComponent implements OnInit {

  listing = JSON.parse(localStorage.getItem('listing')||'[]')
  user = JSON.parse(localStorage.getItem('user')||'[]')

  bookingForm = new FormGroup({
    listingId: new FormControl(),
    bookingId: new FormControl(),
    bookingStart: new FormControl(),
    bookingEnd: new FormControl(),
    username: new FormControl(), 
  })
  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  createBooking(ld: string, bd:string,bs:string,be:string,u:string){
    const ADDBOOKING=gql`
    mutation AddBooking($ld:String!, $bd: String!, $bs: String!, $be: String!,
      $u: String!) {
        addBooking(listingId: $ld, bookingId:$bd, bookingStart:$bs, bookingEnd:$be,
        
        username:$u){
          listingId
          bookingId
          bookingStart
          bookingEnd
          username
        
      }
    }`
    console.log(this.listing[0].listingId)
    console.log(this.user.username)
    return this.apollo.mutate ({
      mutation: ADDBOOKING,
      variables:{
        ld: this.listing[0].listingId,
        bd:bd,
        bs:bs,
        be:be,
        u: this.user.username,
      }

    }).subscribe(({data}) =>{
      console.log(data)
      this.router.navigate(['bookings'])
       
    },(err)=>{
      console.log(err)
    })
  }

  onSubmit(){
    var data = [];
    console.log(this.bookingForm.value);
    data = this.bookingForm.value
    this.createBooking(data.listingId, data.bookingId,data.bookingStart,data.bookingEnd,data.username)
     
      this.ngOnInit();
 
  }
}

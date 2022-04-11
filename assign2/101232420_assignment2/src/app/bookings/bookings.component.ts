import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Apollo, gql } from 'apollo-angular';
import { getListingByUser, getListings } from '../graphql/graphql.queries';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

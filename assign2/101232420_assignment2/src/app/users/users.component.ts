import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap,NavigationExtras } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { users  } from '../graphql/graphql.queries';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = []
  loading = true;
  error: any;

  registerForm = new FormGroup({
    username: new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    type: new FormControl(),
    password: new FormControl(),
  
    
  })

  constructor(private apollo: Apollo, private router: Router  ) { }

  ngOnInit(): void {
    this.apollo.watchQuery({query: users,})
    .valueChanges.subscribe((res: any)=>{
      console.log(res.data)
      this.users = res?.data?.getUsers;
      this.loading= res.loading;
      this.error = res.error
    })

  }

  createUser(uname: string, fname:string,lname:string,email:string,type:string,pass:string){
    const ADDUSER=gql`
    mutation Register($u:String!, $fn: String!, $ln: String!, $e: String!,
      $t: String!, $p: String!) {
      register(username: $u, firstname:$fn, lastname:$ln, email:$e,
        type:$t, password:$p){
          
        username
        firstname
        lastname
        email
        type
        password
      }
    }`
    return this.apollo.mutate ({
      mutation: ADDUSER,
      variables:{
        u: uname,
        fn:fname,
        ln:lname,
        e:email,
        t:type,
        p:pass
      }

    }).subscribe(({data}) =>{
      console.log(data)
      this.router.navigate(['login']);
    },(err)=>{
      console.log(err)
    })
  }

  onSubmit(){
    var data = [];
    console.log(this.registerForm.value);
    data = this.registerForm.value
    console.log(data)
    this.createUser(data.username, data.firstname,data.lastname,data.email,data.type,
      data.password)

      this.ngOnInit();
 
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap,NavigationExtras } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { users  } from '../graphql/graphql.queries';
@Component({
  selector: 'app-users',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: any[] = []
  user: any[]=[];
  loading = true;
  error: any;

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  
    
  })

  constructor(private apollo: Apollo,  private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.apollo.watchQuery({query: users,})
    .valueChanges.subscribe((res: any)=>{
      console.log(res.data)
      this.users = res?.data?.getUsers;
      this.loading= res.loading;
      this.error = res.error
    })

  }

  login(email: string, pass:string){
    const LOGIN=gql`
    mutation Login($e:String!, $p: String!) {
      login(email: $e,  password:$p)
    }`
     this.apollo.mutate ({
      mutation: LOGIN,
      variables:{
        e: email,
        p:pass
      }

    }).subscribe(({data}) =>{
      console.log(data)
    },(err)=>{
      console.log(err)
    })
    
    const GETUSER = gql`
    query GetUserByEmail($email: String!){
      getUserByEmail(email: $email){
        username
        email
        firstname
        lastname
        type
        password
      }
    }`

    this.apollo.watchQuery({query: GETUSER, variables: {"email": email}})
    .valueChanges.subscribe((res: any)=>{
     
      this.user = res?.data?.getUserByEmail[0];
      this.loading= res.loading;
      this.error = res.error
      console.log(this.user)
      if(this.user != null){
        localStorage.setItem('user', JSON.stringify(this.user))
        this.router.navigate(['listingList']);
      }
     
      
    })
   

   
  }



  onSubmit(){
    var data = [];
    console.log(this.loginForm.value);
    data = this.loginForm.value
    console.log(data)
    this.login(data.email,data.password)

      this.ngOnInit();
 
  }

}

import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap,NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  user=JSON.parse(localStorage.getItem('user')||'[]')
  
  constructor(private router: Router){}

  logout() {
    console.log("here")
    localStorage.removeItem('user')
    this.router.navigate(['login']);
  }
  title = '101232420_assignment2';
}

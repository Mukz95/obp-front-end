import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ObpApiService} from '../../services/obp-api.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router, private ObpService: ObpApiService) { }

  // Login credentials
   loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    consumerKey: new FormControl('')
  });

  ngOnInit(): void {
    localStorage.setItem('obp-token', 'eyJhbGciOiJIUzI1NiJ9.eyIiOiIifQ.71TqSWW6q6KeIjB8BT1jEUIBt7rSP4cT7Sq5sY6X2zo');

  }

  getToken(){
    // Making Request for Direct Login JWT to Authenticate user
    this.ObpService.getDirectLoginToken(this.loginForm.controls.username.value,
      this.loginForm.controls.password.value, this.loginForm.controls.consumerKey.value).subscribe(value => {
        // Error checking for token before setting in LocalStorage
        if(value){
          localStorage.setItem('obp-token', value.token);
        }
    });

    this.router.navigate(['/dashboard']);

  }

}

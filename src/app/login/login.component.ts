import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userName: string = '';
  senha: string = '';

  constructor(private route: Router) {}

  login() {
    sessionStorage.setItem('user', this.userName);
    sessionStorage.setItem('senha', this.senha);
    
    this.route.navigate(['home']);
  }

}

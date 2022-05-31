import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeBiometric } from 'capacitor-native-biometric';

@Component({
  selector: 'app-validation2',
  templateUrl: './validation2.component.html',
  styleUrls: ['./validation2.component.scss'],
})
export class Validation2Component implements OnInit {
  checked = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.setCredential();
  }

  setCredential() {
    // Save user's credentials
    let user = sessionStorage.getItem("user");
    let psw = sessionStorage.getItem("psw");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("psw");
    NativeBiometric.setCredentials({
      username: user,
      password: psw,
      server: 'www.gti.com',
    }).then();
  }

  routingpage3() {
    this.router.navigate(['/validation3']);
  }
  plusTard2() {
    this.router.navigate(['/']);
  }
}

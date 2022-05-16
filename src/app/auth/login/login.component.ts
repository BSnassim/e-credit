import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { NavController } from '@ionic/angular';

import {
  AvailableResult,
  BiometryType,
  NativeBiometric,
} from 'capacitor-native-biometric';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  checked = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log(this.checked);
    if (this.tokenService.getToken()) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
      },
      { updateOn: 'submit' }
    );
  }
  // routingpage() {
  //   this.router.navigate(['/validation1']);
  // }

  login() {
    let loginUser: LoginUser;
    // Binding data to Model
    // eslint-disable-next-line prefer-const

    if (this.checked) {
      loginUser = { ...this.loginForm.value };
      this.authService.login(loginUser).subscribe((response) => {
        this.tokenService.setToken(response.token);
        this.router.navigate(['/validation1']);
      });
    }
    if (!this.checked) {
      loginUser = { ...this.loginForm.value };
      this.authService.login(loginUser).subscribe((response) => {
        this.tokenService.setToken(response.token);
        this.router.navigate(['/']);
      });
    }
  }
}

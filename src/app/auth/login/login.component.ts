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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
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
  routingpage() {
    this.router.navigate(['/validation1']);
  }
  checkCredential() {
    NativeBiometric.isAvailable().then((result: AvailableResult) => {
      const isAvailable = result.isAvailable;
      alert('RESULT ' + JSON.stringify(result));
      // const isFaceId=result.biometryType==BiometryType.FACE_ID;
      // const isFaceId = result.biometryType == BiometryType.FACE_ID;

      if (isAvailable) {
        // Get user's credentials
        NativeBiometric.getCredentials({
          server: 'www.example.com',
        }).then((credentials) => {
          alert('CREDENTIAL ' + JSON.stringify(credentials));
          // Authenticate using biometrics before logging the user in
          NativeBiometric.verifyIdentity({
            reason: 'For easy log in',
            title: 'Log in',
            subtitle: 'Maybe add subtitle here?',
            description: 'Maybe a description too?',
          })
            .then(() => {
              //     // Authentication successful
              this.router.navigate(['/validation1']);
              //     // this.login(credentials.username, credentials.password);
            })
            .catch((err) => {
              //   // Failed to authenticate
              alert('FAIL!');
            });
        });
      }
    });
  }

  // checkCredential() {
  //   NativeBiometric.isAvailable().then((result: AvailableResult) => {
  //     const isAvailable = result.isAvailable;
  //     alert('RESULT ' + JSON.stringify(result));
  //     // const isFaceId=result.biometryType==BiometryType.FACE_ID;
  //     // const isFaceId = result.biometryType == BiometryType.FACE_ID;

  //     if (isAvailable) {
  //       // Get user's credentials
  //       NativeBiometric.getCredentials({
  //         server: 'www.example.com',
  //       }).then((credentials) => {
  //         alert('CREDENTIAL ' + JSON.stringify(credentials));
  //         // Authenticate using biometrics before logging the user in
  //         NativeBiometric.verifyIdentity({
  //           reason: 'For easy log in',
  //           title: 'Log in',
  //           subtitle: 'Maybe add subtitle here?',
  //           description: 'Maybe a description too?',
  //         })
  //           .then(() => {
  //             //     // Authentication successful
  //             this.router.navigate(['/validation1']);
  //             //     // this.login(credentials.username, credentials.password);
  //           })
  //           .catch((err) => {
  //             //   // Failed to authenticate
  //             alert('FAIL!');
  //           });
  //       });
  //     }
  //   });
  // }

  login() {
    let loginUser: LoginUser;
    // Binding data to Model
    // eslint-disable-next-line prefer-const
    loginUser = { ...this.loginForm.value };
    this.authService.login(loginUser).subscribe((response) => {
      this.tokenService.setToken(response.token);
      this.router.navigate(['/']);
    });
  }
}

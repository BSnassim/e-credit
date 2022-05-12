import { EventsService } from './../../services/events.service';
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
    public navCtrl: NavController,
    private events: EventsService
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
              alert('SUCCESS!!');
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

  // fingerAuthenticate() {
  //   this.faio.isAvailable().then(
  //     () => {
  //       this.faio.show({}).then(
  //         (val) => {
  //           alert(JSON.stringify(val));
  //         },
  //         (err) => {
  //           alert(JSON.stringify(err));
  //         }
  //       );
  //     },
  //     (err) => {
  //       alert('fingerprint not available');
  //     }
  //   );
  // }

  // fingerAuthenticate() {
  //   this.faio
  //     .show({
  //       clientId: 'fingerprint-demo',
  //       clientSecret: 'password',
  //     })
  //     .then((result) => {
  //       this.navCtrl.setRoot('');
  //     })
  //     .catch((err) => {
  //       console.log('Err: ', err);
  //     });
  // }

  login() {
    let loginUser: LoginUser;
    // Binding data to Model
    // eslint-disable-next-line prefer-const
    loginUser = { ...this.loginForm.value };
    this.authService.login(loginUser).subscribe((response) => {
      this.tokenService.setToken(response.token);
      this.router.navigate(['/']);
      this.events.loginReport();
    });
  }
}

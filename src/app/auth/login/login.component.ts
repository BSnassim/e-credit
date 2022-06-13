/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eqeqeq */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/quotes */
import { EventsService } from './../../services/events.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { NavController } from '@ionic/angular';
import { AvailableResult, NativeBiometric } from 'capacitor-native-biometric';

// import {
//   AvailableResult,
//   BiometryType,
//   NativeBiometric,
// } from 'capacitor-native-biometric';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  pw: string;

  errors = '';

  savedUser = false;

  differentUser = false;

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
        id: ['', Validators.required],
        password: ['', Validators.required],
        checked: [false],
      },
      { updateOn: 'submit' }
    );
    // Get user's credentials
    NativeBiometric.getCredentials({
      server: 'www.gti.com',
    }).then((credentials) => {
      if (credentials) {
        this.loginForm.controls.id.setValue(credentials.username);
        this.loginForm.controls.password.setValue(credentials.password);
        this.pw = credentials.password;
        this.loginForm.controls.id.disable();
        this.loginForm.controls.password.disable();
        this.savedUser = true;
        this.differentUser = true;
      }
    });
  }

  backToNormal() {
    this.savedUser = false;
    this.loginForm.controls.password.enable();
    this.loginForm.controls.password.setValue('');
  }

  backToFP() {
    this.savedUser = true;
    this.loginForm.controls.password.enable();
    this.loginForm.controls.password.setValue(this.pw);
  }

  changeUser() {
    this.differentUser = false;
    this.savedUser = false;
    this.loginForm.controls.password.enable();
    this.loginForm.controls.password.setValue('');
    this.loginForm.controls.id.enable();
    this.loginForm.controls.id.setValue('');
    NativeBiometric.deleteCredentials({
      server: 'www.gti.com',
    }).then();
  }

  routingpage() {
    this.router.navigate(['/validation1']);
  }

  login() {
    let loginUser: LoginUser;
    if (this.savedUser) {
      NativeBiometric.isAvailable().then((result: AvailableResult) => {
        const isAvailable = result.isAvailable;
        // alert('RESULT ' + JSON.stringify(result));
        // const isFaceId=result.biometryType==BiometryType.FACE_ID;
        // const isFaceId = result.biometryType == BiometryType.FACE_ID;

        if (isAvailable) {
          NativeBiometric.verifyIdentity({
            reason: 'For easy log in',
            title: 'Association',
            description: 'Scanner votre empreinte',
          })
            .then(() => {
              //     // Authentication successful
              loginUser = { ...this.loginForm.getRawValue() };
              this.authService.login(loginUser).subscribe(
                (response) => {
                  if (
                    response.roles.some(
                      (i) => i.libelle == 'ROLE_Demande Credit Client'
                    )
                  ) {
                    this.tokenService.setToken(response.token);
                  } else {
                    this.errors =
                      "Vous n'étes pas autorisé à utiliser cette application";
                  }
                },
                (error) => {
                  if (error.status === 0)
                    this.errors = 'Aucune connexion internet';
                  else if (error.status.toString()[0] === '4')
                    this.errors = 'Identifiant ou mot de passe invalide';
                },
                () => {
                  this.router.navigate(['/']);
                  this.events.loginReport();
                }
              );
            })
            .catch((err) => {
              // Failed to authenticate
              this.errors = 'Empreinte non reconnue. Veuillez réessayer';
            });
        }
      });
    } else {
      if (this.loginForm.getRawValue().checked) {
        loginUser = { ...this.loginForm.getRawValue() };
        this.authService.login(loginUser).subscribe(
          (response) => {
            if (
              response.roles.some(
                (i) => i.libelle == 'ROLE_Demande Credit Client'
              )
            ) {
              this.tokenService.setToken(response.token);
              sessionStorage.setItem('user', loginUser.id);
              sessionStorage.setItem('psw', loginUser.password);
              this.routingpage();
            } else {
              this.errors =
                "Vous n'étes pas autorisé à utiliser cette application";
            }
          },
          (error) => {
            this.errors = 'Une erreur est survenue';
          }
        );
      }
      if (!this.loginForm.getRawValue().checked) {
        loginUser = { ...this.loginForm.getRawValue() };
        this.authService.login(loginUser).subscribe(
          (response) => {
            if (
              response.roles.some(
                (i) => i.libelle == 'ROLE_Demande Credit Client'
              )
            ) {
              this.tokenService.setToken(response.token);
            } else {
              this.errors =
                "Vous n'étes pas autorisé à utiliser cette application";
            }
          },
          (error) => {
            if (error.status === 0) this.errors = 'Aucune connexion internet';
            else if (error.status.toString()[0] === '4')
              this.errors = 'Identifiant ou mot de passe invalide';
          },
          () => {
            this.router.navigate(['/']);
            this.events.loginReport();
          }
        );
      }
    }
  }
}

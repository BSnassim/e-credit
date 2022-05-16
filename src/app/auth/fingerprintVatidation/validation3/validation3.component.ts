import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AvailableResult, NativeBiometric } from 'capacitor-native-biometric';

@Component({
  selector: 'app-validation3',
  templateUrl: './validation3.component.html',
  styleUrls: ['./validation3.component.scss'],
})
export class Validation3Component implements OnInit {
  constructor(private router: Router, public navCtrl: NavController) {}

  ngOnInit() {
    this.setCredential();
    this.associate();
  }

  setCredential() {
    // Save user's credentials
    NativeBiometric.setCredentials({
      username: 'username',
      password: 'password',
      server: 'www.example.com',
    }).then();
  }
  associate() {
    NativeBiometric.isAvailable().then((result: AvailableResult) => {
      const isAvailable = result.isAvailable;
      // alert('RESULT ' + JSON.stringify(result));
      // const isFaceId=result.biometryType==BiometryType.FACE_ID;
      // const isFaceId = result.biometryType == BiometryType.FACE_ID;

      if (isAvailable) {
        // Get user's credentials
        NativeBiometric.getCredentials({
          server: 'www.example.com',
        }).then((credentials) => {
          // alert('CREDENTIAL ' + JSON.stringify(credentials));
          // Authenticate using biometrics before logging the user in
          NativeBiometric.verifyIdentity({
            reason: 'For easy log in',
            title: 'Association',
            description: 'Scanner votre empreinte',
          })
            .then(() => {
              //     // Authentication successful
              this.router.navigate(['/successfullValidation']);
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
  plusTard3() {
    this.router.navigate(['/']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

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
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.router.navigate(["/"]);
    }
    this.loginForm = this.formBuilder.group(
      {
        email: ["", Validators.required],
        password: ["", Validators.required],
      },
      { updateOn: "submit" }
    );
  }

  login() {
    let loginUser: LoginUser;
    // Binding data to Model
    loginUser = { ...this.loginForm.value };
    this.authService.login(loginUser).subscribe(
      (response) => {
        this.tokenService.setToken(response.token);
        this.router.navigate(["/"]);
      });
  }

}

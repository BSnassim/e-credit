import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successfull-validation',
  templateUrl: './successfull-validation.component.html',
  styleUrls: ['./successfull-validation.component.scss'],
})
export class SuccessfullValidationComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  redirect() {
    this.router.navigate(['/']);
  }
}

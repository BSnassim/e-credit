import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation2',
  templateUrl: './validation2.component.html',
  styleUrls: ['./validation2.component.scss'],
})
export class Validation2Component implements OnInit {
  checked = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  routingpage3() {
    this.router.navigate(['/validation3']);
  }
  plusTard2() {
    this.router.navigate(['/']);
  }
}

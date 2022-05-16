import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation1',
  templateUrl: './validation1.component.html',
  styleUrls: ['./validation1.component.scss'],
})
export class Validation1Component implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  routingpage2() {
    this.router.navigate(['/validation2']);
  }
  plusTard1() {
    this.router.navigate(['/']);
  }
}

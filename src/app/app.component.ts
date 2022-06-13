import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  showSplash = true;

  loading = false;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.loading = true;
    }, 2000);
  }
}

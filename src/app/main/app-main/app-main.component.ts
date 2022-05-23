/* eslint-disable space-before-function-paren */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss'],
})
export class AppMainComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    (function (_d, m) {
      const kommunicateSettings = {
        appId: '25f891fd7d70ad508f7f7132897fb02fc',
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
      const h = document.getElementsByTagName('head')[0];
      h.appendChild(s);
      (window as any).kommunicate = m;
      // eslint-disable-next-line no-underscore-dangle
      m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});
  }
}

/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  constructor() {}
  chatbot() {
    (function (_d, m) {
      const kommunicateSettings = {
        appId: '72e917ae0b7beca6e76771120c746555',
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

/* eslint-disable space-before-function-paren */
import { Component, OnInit } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot.service';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss'],
})
export class AppMainComponent implements OnInit {
  constructor(private chatservice: ChatbotService) {}

  ngOnInit() {
    this.chatservice.chatbot();
  }
}

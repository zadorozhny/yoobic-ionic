import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IMessage } from '@/app/interfaces/chat';
import { AuthService } from '@/app/shared/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {
  @ViewChild('content') private content: any;
  messages: Array<IMessage>;
  message = new FormControl('');
  private interval: any;

  constructor(private authService: AuthService) { }

  get myId(): number {
    return this.authService.profile?.id || 1;
  }

  async ngOnInit() {
    await this.getMessages();
    this.subscribeOnNewMessage();
  }

  ngOnDestroy() {
    this.unsubscribeOnNewMessage();
  }

  sendMessage() {
    if (this.message.value) {
      this.messages.push({
        userId: this.myId,
        text: this.message.value,
        date: new Date()
      });
      this.message.setValue('');
      this.content.scrollToBottom(300);
    }
  }

  private async getMessages() {
    const messages: Array<IMessage> = await new Promise((resolve, _) => {
      setTimeout(() => {
        resolve([
          {
            userId: this.myId,
            text: 'Hi',
            date: new Date(2021, 5, 35, 10, 33, 30)
          },
          {
            userId: 2,
            text: 'Hello',
            date: new Date(2021, 6, 35, 10, 33, 30)
          }
        ]);
      }, 1000);
    });
    this.messages = messages;
  }

  private unsubscribeOnNewMessage() {
    clearInterval(this.interval);
  }

  private subscribeOnNewMessage() {
    this.interval = setInterval(() => {
      this.messages.push({
        userId: 2,
        text: 'New Message!',
        date: new Date()
      });
    }, 5000);
  }
}

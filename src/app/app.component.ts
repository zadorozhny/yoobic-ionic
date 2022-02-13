import { Component } from '@angular/core';
import { AuthService } from '@/app/shared/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public pages = [
    { title: 'Movies', url: '/movies', icon: 'star' },
    { title: 'Chat', url: '/chat', icon: 'chatbubbles' },
    { title: 'SignIn', url: '/signin', icon: 'log-in' },
  ];
  constructor(private authService: AuthService) {}

  get profile() {
    return this.authService.profile;
  }
}

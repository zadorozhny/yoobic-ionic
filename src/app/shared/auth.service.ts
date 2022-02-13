import { Injectable } from '@angular/core';
import { IProfile } from '@/app/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public profile: IProfile;
  public token: string;

  constructor() { }

  public async signin({ username }) {
    const { token, profile } = await new Promise((resolve, _) => {
      setTimeout(() => {
        resolve({ token: 'token', profile: { id: 1, username } });
      }, 1000);
    });

    this.token = token;
    this.profile = profile;
  }
}

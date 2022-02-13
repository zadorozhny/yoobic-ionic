import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '@/app/shared/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  public auth = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {}

  public async signin() {
    const loading = await this.loadingController.create({ message: 'Please wait...' });
    try {
      await loading.present();
      await this.authService.signin(this.auth.value);
      this.router.navigate(['movies']);
    } catch (err) {
      console.error(err);
    } finally {
      loading.dismiss();
    }
  }

}

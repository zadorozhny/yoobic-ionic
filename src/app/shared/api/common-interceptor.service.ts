import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BASE_URL, API_VERSION, API_KEY } from '@/config';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@/app/shared/auth.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      url: `${BASE_URL}${API_VERSION}${req.url}`,
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: this.authService.token || ''
      }),
      setParams: {
        api_key: API_KEY
      }
    });

    return next.handle(request);
  }
}

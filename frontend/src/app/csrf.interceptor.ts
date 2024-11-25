
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = this.getCsrfToken();

    if (csrfToken) {
      const cloned = req.clone({
        headers: req.headers.set('X-XSRF-TOKEN', csrfToken)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

  private getCsrfToken(): string {
    const name = 'XSRF-TOKEN=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(name)) {
        return cookie.substring(name.length);
      }
    }
    return '';
  }
}

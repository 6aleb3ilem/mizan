import { Injectable } from '@angular/core';
import { NavigationEnd, Router, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  isHomePage: boolean = true;

  constructor(private router: Router) {
    // Type assertion within the filter
    router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomePage = event.url === '/' || event.url === '/page1' || event.url === '/accueil' || event.url === '/send-verification' || event.url === '/set-password' || event.url === '/verify-code' || event.url==='/login';
    });
  }
}

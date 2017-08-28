import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class VerificationNavigationService {

  constructor(private router: Router) { }
  navigate(data: number, base: string): void {
    // tslint:disable-next-line:prefer-const
    let display: string;
    // tslint:disable-next-line:prefer-const
    // let base: string = this.route.routeConfig.path;
    display = '';
    switch (data) {
      case 1:
        display = '/details';
        break;
      case 2:
        display = '/address';
        break;
      case 3:
        display = '/phone';
        break;
      case 4:
        display = '/bank';
        break;
      case 5:
        display = '/institutes';
        break;
      case 6:

        break;
      case 7:
        display = '/social';
        break;
      default:
        break;
    }
    if (display.length > 0) {
      // tslint:disable-next-line:prefer-const
      let path: string = base + display;
      this.router.navigate([path]);
    }
  }
}

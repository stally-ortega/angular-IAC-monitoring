import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerVisibilityService {
  private activeRequests = 0;
  private visibility = new BehaviorSubject<boolean>(false);

  readonly visibility$ = this.visibility.asObservable();

  show(): void {
    this.activeRequests++;
    if (this.activeRequests === 1) {
      this.visibility.next(true);
    }
  }

  hide(): void {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }
    if (this.activeRequests === 0) {
      this.visibility.next(false);
    }
  }
}

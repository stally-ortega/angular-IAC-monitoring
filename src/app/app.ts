import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common'; // IMPORTA AsyncPipe y CommonModule
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoadingSpinner} from './shared/components/loading-spinner/loading-spinner.component';
import { SpinnerVisibilityService } from './core/services/spinner-visibility';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    LoadingSpinner,
    AsyncPipe
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  protected title = 'my-app';
  isLoading$: Observable<boolean>;

  constructor(private spinnerService: SpinnerVisibilityService) {
    this.isLoading$ = this.spinnerService.visibility$;
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      console.log('Sistema en modo oscuro detectado. Aplicando clase dark-mode.');
      document.body.classList.add('dark-mode');
    } else if (typeof window !== 'undefined') {
      console.log('Sistema NO está en modo oscuro o matchMedia no es compatible.');
    }
  }
}

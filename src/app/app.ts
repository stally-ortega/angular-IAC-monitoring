import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common'; // IMPORTA AsyncPipe y CommonModule
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar.component/navbar.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner.component/loading-spinner.component';
import { SpinnerVisibilityService } from './core/services/spinner-visibility';
import { Observable } from 'rxjs';
import { TradingDataService } from './core/services/trading-data';
import { Kpi } from './shared/models/interfaces/kpi.model';
import { ThemedSpinner } from './shared/components/themed-spinner/themed-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    ThemedSpinner,
    AsyncPipe
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  protected title = 'my-app';
  private tradingDataService = inject(TradingDataService);
  // private spinnerService = inject(SpinnerVisibilityService); // Opción 1 para inyectar
  isLoading$: Observable<boolean>;

  summaryData: any;
  kpiPnl?: Kpi;
  kpiWinRate?: Kpi;

  constructor(private spinnerService: SpinnerVisibilityService) { // Opción 2 para inyectar
    this.isLoading$ = this.spinnerService.visibility$;
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      console.log('Sistema en modo oscuro detectado. Aplicando clase dark-mode.');
      document.body.classList.add('dark-mode');
    } else if (typeof window !== 'undefined') {
      console.log('Sistema NO está en modo oscuro o matchMedia no es compatible.');
    }

    console.log('FinancialPerformanceComponent: ngOnInit. Llamando a getFinancialSummary (simulado)...');
    this.tradingDataService.getFinancialSummary()
      .subscribe({
        next: (data) => {
          console.log('FinancialPerformanceComponent: Datos recibidos:', data);
        },
        error: (err) => console.error('Error obteniendo resumen financiero simulado:', err)
      });
  }
}

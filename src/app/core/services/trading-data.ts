import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs'; // 'of' para simular datos por ahora
import { ApiService } from './api';
import { SpinnerVisibilityService } from './spinner-visibility';
import { Trade } from '../../shared/models/interfaces/execution.model';

@Injectable({
  providedIn: 'root'
})
export class TradingDataService {
  constructor(
    private apiService: ApiService,
    private spinnerService: SpinnerVisibilityService
  ) {}

  // Obtener datos financieros (a simular por ahora)
  getFinancialSummary(): Observable<any> { // Reemplazar 'any' con tu modelo
    this.spinnerService.show();
    // return this.apiService.get<FinancialSummary>('/financial-summary');

    // Datos simulados
    return of({ totalPnl: 1250.75, winRate: 0.65, profitFactor: 1.8 })
      .pipe(
        tap(() => console.log('Simulando retraso de 3 segundos...')),
        delay(3000), // Simula un retraso de 3 segundos
        tap(() => console.log('Retraso simulado completado.')),
        tap({
          // next: () => this.spinnerService.hide(), // Ocultar en el 'next' si todo va bien
          // error: () => this.spinnerService.hide(), // Ocultar también en caso de error
          finalize: () => { // finalize se ejecuta en cualquier caso (éxito, error, cancelación)
            console.log('TradingDataService: getFinancialSummary (simulado) finalizando. Ocultando spinner.');
            // 2. OCULTA EL SPINNER MANUALMENTE
            this.spinnerService.hide();
          }
      }));
  }

  // Obtener trades más recientes
  getRecentTrades(limit: number = 20): Observable<Trade[]> {
    // return this.apiService.get<Trade[]>(`/trades?limit=${limit}`);

    // Datos simulados
    return of([
      { id: '1', timestamp: new Date(), asset: 'BTC/USD', type: 'BUY', price: 30000, quantity: 0.1, pnl: 50 },
      { id: '2', timestamp: new Date(), asset: 'ETH/USD', type: 'SELL', price: 2000, quantity: 2, pnl: -20 }
    ]);
  }

  // Obtener métricas de rendimiento del modelo
  getModelPerformanceMetrics(): Observable<any> {
    // return this.apiService.get<ModelMetric>('/model-performance');

    // Datos simulados
    return of({ liveAccuracy: 0.72, f1Score: 0.68, predictionDistribution: { buy: 40, sell: 35, hold: 25 } });
  }

  // ... otros métodos para KPIs operacionales, etc.
}
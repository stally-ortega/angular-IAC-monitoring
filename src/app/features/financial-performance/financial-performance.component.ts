import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, finalize } from 'rxjs';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

// Servicios
import { TradingDataService } from '@core/services/providers/trading-data';
import { EquityCurveChartService } from '@core/services/charts/equity-curve-chart';

// Modelos y Componentes Reutilizables
import { Kpi } from '@models/interfaces/kpi.model';
import { KpiCardComponent } from '@shared/components/kpi-card/kpi-card.component';
import { LoadingSpinner } from '@shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-financial-performance',
  standalone: true,
  imports: [
    CommonModule,
    NgxEchartsModule,
    KpiCardComponent,
    LoadingSpinner
  ],
  templateUrl: './financial-performance.component.html',
  styleUrls: ['./financial-performance.component.scss']
})
export class FinancialPerformanceComponent implements OnInit {
  // Inyección de servicios
  private tradingDataService = inject(TradingDataService);
  private equityChartService = inject(EquityCurveChartService);

  // Propiedades para la vista
  public kpiCards: Kpi[] = [];
  public chartOptions?: EChartsOption;
  public isLoading = true;

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.isLoading = true;

    // Usamos forkJoin para ejecutar ambas llamadas de datos en paralelo
    forkJoin({
      summary: this.tradingDataService.getKpis(),
      chartOpts: this.equityChartService.generateChartOptions()
    })
    .pipe(
      // finalize asegura que el spinner se oculte al final, sin importar si hubo éxito o error
      finalize(() => this.isLoading = false)
    )
    .subscribe({
      next: (responses) => {
        // Procesamos la respuesta de los KPIs
        this.kpiCards = this.mapDataToKpis(responses.summary);
        // Asignamos directamente las opciones del gráfico
        this.chartOptions = responses.chartOpts;
      },
      error: (err) => {
        console.error('Error al cargar los datos de la página:', err);
        // En caso de error, dejamos los datos vacíos para mostrar un mensaje
        this.kpiCards = [];
        this.chartOptions = undefined;
      }
    });
  }

  private mapDataToKpis(data: any): Kpi[] {
    // Transforma los datos del servicio al modelo que espera el KpiCardComponent
    return [
      {
        title: 'P&L Total',
        value: data.totalPnl,
        unit: '$',
      },
      {
        title: 'Win Rate',
        value: (data.winRate * 100).toFixed(2),
        unit: '%',
      },
      {
        title: 'Profit Factor',
        value: data.profitFactor.toFixed(2),
      }
    ];
  }
}
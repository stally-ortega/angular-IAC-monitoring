// src/app/core/services/charts/equity-curve-chart.service.ts
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EChartsOption } from 'echarts';
import { BaseChartService } from './base-chart.service';
import { TradingDataService } from '../trading-data'; // Nuestro servicio de datos

// Definimos el tipo de dato que esperamos para este gráfico
type EquityData = { date: string; pnl: number }[];

@Injectable({
  providedIn: 'root' // Este servicio sí se puede inyectar en los componentes
})
export class EquityCurveChartService extends BaseChartService<EquityData> {

  private tradingDataService = inject(TradingDataService);

  /**
   * Implementación de getChartData para este gráfico específico.
   * Llama a TradingDataService para obtener los datos de la curva de ganancias.
   */
  protected override getChartData(): Observable<EquityData> {
    return this.tradingDataService.getEquityCurve();
  }

  /**
   * Implementación de createChartOptions para este gráfico específico.
   * Construye la configuración del gráfico de líneas a partir de los datos.
   */
  protected override createChartOptions(data: EquityData): EChartsOption {
    // Extraemos las etiquetas (fechas) y los valores (pnl)
    const dates = data.map(item => item.date);
    const pnlValues = data.map(item => item.pnl);

    const commonOptions = this.getCommonOptions(); // Obtenemos las opciones comunes

    // Combinamos las opciones comunes con las específicas de este gráfico
    return {
      ...commonOptions, // Spread operator para fusionar las opciones
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisLabel: { color: '#ccc' }
      },
      yAxis: {
        type: 'value',
        axisLabel: { formatter: '${value}', color: '#ccc' },
        splitLine: { lineStyle: { color: '#333' } }
      },
      series: [
        {
          name: 'P&L Acumulado',
          type: 'line',
          smooth: true,
          data: pnlValues,
          itemStyle: { color: '#00CFE8' }
          /*areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [{ offset: 0, color: 'rgba(0, 207, 232, 0.5)' }, { offset: 1, color: 'rgba(0, 207, 232, 0)' }]
            }
          }*/
        }
      ]
    };
  }
}
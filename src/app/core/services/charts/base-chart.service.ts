// src/app/core/services/charts/base-chart.service.ts
import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Observable, map } from 'rxjs';

@Injectable() // No usamos providedIn: 'root' porque esta clase no se inyecta directamente
export abstract class BaseChartService<T> {

  /**
   * Método abstracto que las clases hijas DEBEN implementar.
   * Su responsabilidad es obtener los datos crudos necesarios para el gráfico.
   * @returns Un Observable con los datos del tipo T.
   */
  protected abstract getChartData(): Observable<T>;

  /**
   * Método abstracto que las clases hijas DEBEN implementar.
   * Transforma los datos crudos en la configuración específica de ECharts.
   * @param data Los datos recibidos de getChartData().
   * @returns La configuración de ECharts (EChartsOption).
   */
  protected abstract createChartOptions(data: T): EChartsOption;

  /**
   * Devuelve un objeto con opciones comunes a todos los gráficos.
   * Las clases hijas pueden extender estas opciones.
   * @returns Un objeto parcial de EChartsOption con configuraciones comunes.
   */
  protected getCommonOptions(): EChartsOption {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
    };
  }

  /**
   * Método público que los componentes usarán para obtener la configuración del gráfico.
   * Orquesta el proceso: obtiene datos, los transforma y devuelve las opciones.
   * @returns Un Observable con la configuración final de ECharts.
   */
  public generateChartOptions(): Observable<EChartsOption> {
    return this.getChartData().pipe(
      map(data => this.createChartOptions(data))
    );
  }
}
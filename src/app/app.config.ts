import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http'; // IMPORTA ESTO

import { routes } from './app.routes'; // Asumo que este archivo define tus rutas principales
import { httpSpinnerInterceptor } from './core/interceptors/http-spinner-interceptor';
import { myTheme } from '@core/themes/echart-theme';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

/**
 * Función factory que se ejecutará al iniciar la app.
 * Registra nuestro tema personalizado en ECharts.
 */
export function registerEchartsThemes() {
  return () => {
    echarts.registerTheme('myTheme', myTheme);
    console.log('ECharts custom theme "myTheme" registered.');
  };
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([httpSpinnerInterceptor])
    ),

    // 4. REGISTRA EL TEMA ECHART AL INICIAR LA APLICACIÓN
    {
      provide: APP_INITIALIZER,
      useFactory: registerEchartsThemes,
      multi: true
    },

    // 5. APLICA EL TEMA GLOBALMENTE A TODOS LOS GRÁFICOS echart
    importProvidersFrom(
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts'),
        theme: 'myTradingTheme'
      })
    )
  ]
};
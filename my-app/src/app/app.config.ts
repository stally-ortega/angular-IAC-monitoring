import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http'; // IMPORTA ESTO

import { routes } from './app.routes'; // Asumo que este archivo define tus rutas principales
import { httpSpinnerInterceptor } from './core/interceptors/http-spinner-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([httpSpinnerInterceptor])
    )
  ]
};
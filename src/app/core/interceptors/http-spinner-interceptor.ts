import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerVisibilityService } from '../services/spinner-visibility';

export const httpSpinnerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const spinnerService = inject(SpinnerVisibilityService);

  // No mostrar spinner para ciertas rutas si es necesario (ej. logs silenciosos)
  // if (req.url.includes('/silent-log')) {
  //   return next(req);
  // }

  spinnerService.show();

  return next(req).pipe(
    finalize(() => {
      spinnerService.hide();
    })
  );
};

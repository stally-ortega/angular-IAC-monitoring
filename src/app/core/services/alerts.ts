import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './providers/api';
import { Alert } from '@models/interfaces/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  constructor(private apiService: ApiService) {}

  getAlerts(): Observable<Alert[]> {
    // return this.apiService.get<Alert[]>('/alerts');
    return of([
      { id: 'alert1', name: 'High Drawdown', condition: 'Drawdown > 10%', status: 'Active' },
      { id: 'alert2', name: 'Low Accuracy', condition: 'Accuracy < 60%', status: 'Inactive' }
    ]); // Datos simulados
  }

  createAlert(alertData: Alert): Observable<Alert> {
    // return this.apiService.post<Alert>('/alerts', alertData);
    return of({ ...alertData, id: 'newAlertId' }); // Simulado
  }

  // ... métodos para updateAlert y deleteAlert
}

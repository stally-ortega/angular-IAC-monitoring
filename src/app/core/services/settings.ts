import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './providers/api';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private apiService: ApiService) {}

  getAppSettings(): Observable<any> {
    // return this.apiService.get('/settings');
    return of({ theme: 'dark', notificationsEnabled: true, defaultAsset: 'BTC/USD' }); // Simulado
  }

  saveAppSettings(settings: any): Observable<any> {
    // return this.apiService.put('/settings', settings);
    return of(settings); // Simulado
  }
}
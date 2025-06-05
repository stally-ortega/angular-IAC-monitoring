import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root'
})
export class AzureService {
  constructor(private apiService: ApiService) {}

  getAksCpuUsage(): Observable<any> {
    // return this.apiService.get('/azure/aks/cpu-usage');
    return of({ currentUsage: 45, history: [30, 32, 40, 45, 43] }); // Simulado
  }

  getAksMemoryUsage(): Observable<any> {
    // return this.apiService.get('/azure/aks/memory-usage');
    return of({ currentUsage: 60, history: [50, 55, 58, 60, 62] }); // Simulado
  }
}

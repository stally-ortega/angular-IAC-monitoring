import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, { headers: this.getHeaders(), params });
  }

  /*post<T>(path: string, body: object = {}): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, JSON.stringify(body), { headers: this.getHeaders() });
  }

  put<T>(path: string, body: object = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, JSON.stringify(body), { headers: this.getHeaders() });
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`, { headers: this.getHeaders() });
  }*/
}
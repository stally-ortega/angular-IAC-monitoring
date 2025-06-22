import { Injectable } from '@angular/core';
import { delay, map, Observable, of, tap } from 'rxjs'; // 'of' para simular datos por ahora
import { ApiService } from './api';
import { SpinnerVisibilityService } from '../spinner-visibility';
import { Order } from '@shared/models/interfaces/order.model';
import { OrderMapper } from '@core/mappers/order.mapper';
import { MongoOrder } from '@shared/models/interfaces/templates/mongo-order.model';
import { HttpParams } from '@angular/common/http';
import { ordersResponse } from '@core/mappers/orders-resp';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TradingDataService {
  private orderMapper = new OrderMapper();
  //private params = new HttpParams().set('from', '2025-06-08').set('limit', '100');
  private params = new HttpParams();
  private apiUrl = '/core/services/providers/order-resp.json';

  constructor(
    private apiService: ApiService,
    private spinnerService: SpinnerVisibilityService,
    private http: HttpClient
  ) {}

  // Obtener ordenes
  getOrders(limit: number = 0, from: string = ''): Observable<Order[]> {
    this.spinnerService.show();
    this.params = this.params.set('from', from).set('limit', limit.toString());
    //return this.apiService.get<MongoOrder[]>('/orders', this.params)
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(mongoOrders => {
        return mongoOrders.map(mongoOrder => this.orderMapper.map(mongoOrder));
      })
    );
  }

  /**
   * Obtiene los datos crudos y devuelve los KPIs calculados.
   */
  getKpis(): Observable<KpiResults> {
    // HttpClient espera por defecto un JSON, por eso el <any[]>
    return of(ordersResponse).pipe(
      map(rawData => calculateKpisFromData(rawData))
    );
  }

  // Obtener trades más recientes
  getRecentTrades(limit: number = 20): Observable<any[]> {
    // return this.apiService.get<Trade[]>(`/trades?limit=${limit}`);

    // Datos simulados
    return of([
      { id: '1', timestamp: new Date(), asset: 'BTC/USD', type: 'BUY', price: 30000, quantity: 0.1, pnl: 50 },
      { id: '2', timestamp: new Date(), asset: 'ETH/USD', type: 'SELL', price: 2000, quantity: 2, pnl: -20 }
    ]);
  }

  // Obtener métricas de rendimiento del modelo
  getModelPerformanceMetrics(): Observable<any> {
    // return this.apiService.get<ModelMetric>('/model-performance');

    // Datos simulados
    return of({ liveAccuracy: 0.72, f1Score: 0.68, predictionDistribution: { buy: 40, sell: 35, hold: 25 } });
  }

  getEquityCurve(): Observable<{date: string, pnl: number}[]> {
    const simulatedData = [];
    let currentPnl = 1000; // P&L inicial
    
    for (let i = 15; i > 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      currentPnl += (Math.random() - 0.45) * 100; // Simula una fluctuación diaria
      
      simulatedData.push({
        date: date.toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }),
        pnl: parseFloat(currentPnl.toFixed(2))
      });
    }

    // Usamos 'of' y 'delay' para simular una llamada asíncrona
    return of(simulatedData).pipe(delay(500)); 
  }
}

interface TradeRecord {
  action: number;
  equity: number;
  timestamp: string;
}

// Define la estructura del objeto de KPIs que devolveremos
interface KpiResults {
  totalPnl: number;
  winRate: number;
  profitFactor: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  note?: string;
}
function calculateKpisFromData(data: any[]): KpiResults {
  // 1. Filtrar y ordenar los datos relevantes
  const tradeData: TradeRecord[] = data
    .filter(record => record.hasOwnProperty('action') && record.hasOwnProperty('equity'))
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  if (tradeData.length === 0) {
    return {
      totalPnl: 0,
      winRate: 0,
      profitFactor: 0,
      totalTrades: 0,
      winningTrades: 0,
      losingTrades: 0,
      note: "No se encontraron registros con 'action' y 'equity' para los cálculos."
    };
  }

  const tradesPnl: number[] = [];
  let equityAtBuy: number | null = null;

  // 2. Iterar sobre los datos para encontrar ciclos de compra-venta
  for (const record of tradeData) {
    if (record.action === 1) { // Acción de COMPRA
      if (equityAtBuy === null) {
        equityAtBuy = record.equity;
      }
    } else if (record.action === 2) { // Acción de VENTA
      if (equityAtBuy !== null) {
        const pnl = record.equity - equityAtBuy;
        tradesPnl.push(pnl);
        equityAtBuy = null; // Resetear para el próximo trade
      }
    }
  }

  // 3. Si no se completaron trades, calcular P&L total y retornar
  if (tradesPnl.length === 0) {
    const totalPnlOverall = tradeData[tradeData.length - 1].equity - tradeData[0].equity;
    return {
      totalPnl: totalPnlOverall,
      winRate: 0,
      profitFactor: 0,
      totalTrades: 0,
      winningTrades: 0,
      losingTrades: 0,
      note: "No se encontraron ciclos de compra-venta completados. 'totalPnl' representa el cambio total del patrimonio."
    };
  }
  
  // 4. Calcular los KPIs finales
  const totalPnl = tradesPnl.reduce((acc, pnl) => acc + pnl, 0);
  const winningTrades = tradesPnl.filter(pnl => pnl > 0);
  const losingTrades = tradesPnl.filter(pnl => pnl <= 0);

  const totalProfitFromWinners = winningTrades.reduce((acc, pnl) => acc + pnl, 0);
  const totalLossFromLosers = Math.abs(losingTrades.reduce((acc, pnl) => acc + pnl, 0));

  const winRate = winningTrades.length / tradesPnl.length;
  const profitFactor = totalLossFromLosers > 0 ? totalProfitFromWinners / totalLossFromLosers : Infinity;

  return {
    totalPnl,
    winRate,
    profitFactor,
    totalTrades: tradesPnl.length,
    winningTrades: winningTrades.length,
    losingTrades: losingTrades.length
  };
}
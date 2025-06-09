export interface Trade {
  id: string;
  timestamp: Date | string;
  asset: string;
  type: 'BUY' | 'SELL' | 'HOLD';
  price: number;
  quantity: number;
  pnl?: number; // Profit and Loss, opcional si no todas las operaciones lo tienen de inmediato
  orderId?: string;
  commission?: number;
  // Otros campos opcionales para detalles adicionales
  // equity?: number; // capitalor + (posición (solo 3 decimales) * precio actual(con 6 dcimales))
}
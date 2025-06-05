export interface Kpi {
  title: string;
  value: string | number;
  unit?: string; // Ej: '%', '$'
  trend?: 'up' | 'down' | 'neutral'; // Para íconos de tendencia
  previousValue?: string | number; // Para comparar
  // Otros campos para color, ícono, etc.
}
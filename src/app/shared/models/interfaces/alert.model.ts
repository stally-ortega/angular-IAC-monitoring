export interface Alert {
  id: string;
  name: string;
  description?: string;
  condition: string; // Ej: "Drawdown > 10%", "Accuracy < 60%"
  metric?: string; // Ej: "Drawdown", "Accuracy"
  threshold?: number;
  operator?: '>' | '<' | '>=' | '<=' | '==';
  status: 'Active' | 'Inactive' | 'Triggered';
  createdAt?: Date | string;
}
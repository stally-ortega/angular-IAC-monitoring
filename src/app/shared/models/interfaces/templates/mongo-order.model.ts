export interface MongoOrder {
  _id: string;
  timestamp: string; // En la API viene como string
  symbol: string;
  action: number;
  response: {
    status: string;
  };
}
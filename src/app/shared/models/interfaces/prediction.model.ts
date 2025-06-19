import { OhlcvModel } from "./ohlcv.model";

export interface PredictionModel {
  id: string;
  timestamp: Date | string;
  action: number | null;
  price: number | null;
  ohlcv: OhlcvModel;
}

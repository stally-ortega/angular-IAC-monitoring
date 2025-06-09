import { ActionEnum } from "../enums/action.enum";
import { OhlcvModel } from "./ohlcv.model";

export interface PredictionModel {
  id: string;
  timestamp: Date | string;
  action: ActionEnum;
  ohlcv: OhlcvModel;
}

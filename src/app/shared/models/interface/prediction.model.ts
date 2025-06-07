import { ActionEnum } from "../enum/action.enum";
import { OhlcvModel } from "./ohlcv.model";

export interface PredictionModel {
  id: string;
  timestamp: Date | string;
  action: ActionEnum;
  ohlcv: OhlcvModel;
}

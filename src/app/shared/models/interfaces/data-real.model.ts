import { IndicatorModel } from "./indicator.model";
import { OhlcvModel } from "./ohlcv.model";

export interface DataRealModel {
    id: string;
    timestamp: Date | string;
    action: number | null;
    price: number | null;
    ohlcv: OhlcvModel;
    indicators: IndicatorModel;
    target: number | null;
}

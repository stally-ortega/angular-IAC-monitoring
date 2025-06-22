import { ExecutionResponseModel } from "./execution-response.model";

export interface Order {
  id: string;
  timestamp: Date | string;
  symbol: string | null;
  action: number | null;
  response: ExecutionResponseModel;
}
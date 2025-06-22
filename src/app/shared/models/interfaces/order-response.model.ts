export interface ExecutionResponseModel {
    symbol: string | null;
    orderId: number | null;
    orderListId: number | null;
    clientOrderId: string | null;
    transactTime: number | null;
    price: string | null;
    origQty: string | null;
    executedQty: string | null;
    origQuoteOrderQty: string  | null;
    cummulativeQuoteQty: string | null;
    status: string;
    timeInForce: string | null;
    type: string | null;
    side: string | null;
    workingTime: number | null;
    fills: Array<{
        price: string;
        qty: string;
        commission: string;
        commissionAsset: string;
        tradeId: number;
    }> | null;
    selfTradePreventionMode: string | null;
}
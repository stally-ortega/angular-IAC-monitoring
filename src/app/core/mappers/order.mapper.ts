// order.mapper.ts

import { Mapper } from '@models/interfaces/mapper.model';
import { MongoOrder } from '@models/interfaces/templates/mongo-order.model';
import { Order } from '@shared/models/interfaces/order.model';
import { ExecutionResponseModel } from '@shared/models/interfaces/order-response.model';

export class OrderMapper implements Mapper<MongoOrder, Order> {

  map(input: MongoOrder): Order {
    const responseModel: ExecutionResponseModel = {
      status: input.response.status,
      symbol: null,
      orderId: null,
      orderListId: null,
      clientOrderId: null,
      transactTime: null,
      price: null,
      origQty: null,
      executedQty: null,
      origQuoteOrderQty: null,
      cummulativeQuoteQty: null,
      timeInForce: null,
      type: null,
      side: null,
      workingTime: null,
      fills: null,
      selfTradePreventionMode: null,
    };

    const order: Order = {
      id: input._id,
      timestamp: new Date(input.timestamp),
      symbol: input.symbol,
      action: input.action,
      response: responseModel
    };

    return order;
  }
}
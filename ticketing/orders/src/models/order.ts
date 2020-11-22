import { model, Model, Document, Schema } from "mongoose";
import { OrderStatus } from "@mscticketing/common/build/events";
import { TicketDoc } from "./ticket";

interface OrderAttrs {
  userId: string;
  expiresAt: Date;
  ticket: TicketDoc;
  status: OrderStatus;
}

interface OrderDoc extends Document {
  userId: string;
  expiresAt: Date;
  ticket: TicketDoc;
  status: OrderStatus;
}

interface OrderModel extends Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: OrderStatus.Created,
      enum: Object.values(OrderStatus),
    },
    expiresAt: {
      type: Schema.Types.Date,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
    },
  },
  {
    toJSON: {
      versionKey: false,
      transform: (_, { _id: id, ...rest }) => ({ id, ...rest }),
    },
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => new Order(attrs);

const Order = model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };

import { model, Model, Document, Schema } from "mongoose";
import { Order, OrderStatus } from "./order";

interface TicketAttrs {
  title: string;
  price: number;
}

export interface TicketDoc extends Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      versionKey: false,
      transform: ({ _id: id, ...rest }) => ({ id, ...rest }),
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => new Ticket(attrs);

ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.Complete,
        OrderStatus.AwaitingPayment,
      ],
    },
  });

  return !!existingOrder;
};

const Ticket = model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };

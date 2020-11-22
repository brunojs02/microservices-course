import { model, Model, Document, Schema } from "mongoose";

interface TicketAttrs {
  title: string;
  price: number;
}

export interface TicketDoc extends Document {
  title: string;
  price: number;
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
      transform: ({ _id, ...rest }) => ({ ...rest }),
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => new Ticket(attrs);

const Ticket = model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };

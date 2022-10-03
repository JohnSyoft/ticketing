import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
interface ticketAttrs {
  title: string;
  price: number;
  userId: string;
  version: number;
}

const ticketSchema = new mongoose.Schema<ticketAttrs>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});
ticketSchema.set('versionKey','version')
ticketSchema.plugin(updateIfCurrentPlugin)
const Ticket = mongoose.model<ticketAttrs>("tickets", ticketSchema);

export default Ticket;

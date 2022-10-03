import mongoose from "mongoose";
import { OrderStatus } from "@ticketsjohn/common";
import { TicketDoc } from "./ticket";
interface OrderModel {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  status: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
});

export const orderModal = mongoose.model<OrderModel>("order", orderSchema);
export { OrderStatus };

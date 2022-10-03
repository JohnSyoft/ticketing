import {
  Listner,
  NotFound,
  Subjects,
  TicketUpdated,
} from "@ticketsjohn/common";
import { Ticket } from "../../model/ticket";
import { QUEUE_GROUP_NAME } from "./queue-group-name";

export class TicketUpdatedListner extends Listner<TicketUpdated> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = QUEUE_GROUP_NAME;
  async onMessage(data: TicketUpdated["data"], msg) {
    const ticket = await Ticket.findById(data.id);
    if (!ticket) {
      throw new NotFound();
    }

    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();
  }
}

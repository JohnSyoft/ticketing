import { NotFound } from "@ticketsjohn/common";
import { Router } from "express";
import { createArr } from "../controller/create-ticket";
import Ticket from "../models/ticket";
import { Request, Response } from "express";
import { TicketUpdatedPublisher } from "../events/publishers/ticketupdated-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = Router();
router.route("/").post(...createArr);
router.route("/:id").get(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const ticket = await Ticket.findById(id);
    res.status(200).json(ticket);
  } catch (err) {
    throw new NotFound();
  }
});
router
  .route("/update/:id")
  .patch(createArr[0], async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.currentuser!.id;

    try {
      const updatedData = await Ticket.updateOne(
        { _id: id, userId },
        { title: req.body.title, price: req.body.price }
      );
      const data = await Ticket.find({ _id: id, userId });
      new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: id,
        version: 0,
        title: req.body.title,
        price: req.body.price,
        userId: userId,
      });
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      // res.status(200).json("no data found");
      throw new NotFound();
    }
  });

export { router as CreateRoute };

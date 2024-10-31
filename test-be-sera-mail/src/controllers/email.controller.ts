import { type Request, type Response } from "express";
import { createEmail } from "../services/email.service";
import amqplib from "amqplib";

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queue = "send_email_queue";

    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
      if (msg) {
        const data = JSON.parse(msg.content.toString());
        await createEmail(req.body.email);
        channel.ack(msg);
      }
    });

    console.log("Email consumer service started");
    return res.send({ status: 0, message: "Sukses", data: null });
  } catch (error) {
    return res.send({ status: 102, message: error, data: null });
  }
};

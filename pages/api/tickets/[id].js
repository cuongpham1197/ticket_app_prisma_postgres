import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const ticketData = await req.body;
      await prisma.ticket.update({
        where: {
          id: id,
        },
        data: ticketData,
      });

      return res.status(200).json({ message: "Ticket updated" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error",
        err,
      });
    }
  }

  if (req.method === "GET") {
    const { id } = req.query;
    const foundTicket = await prisma.ticket.findUnique({ where: { id: id } });
    return res.status(200).json({ foundTicket });
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await prisma.ticket.delete({ where: { id: id } });
      return res.status(200).json({ message: "Ticket deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error",
        err,
      });
    }
  }
}

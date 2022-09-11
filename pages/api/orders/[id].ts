import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const customer = await prisma.orders.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Customer: true,
        Detail: true,
        image: true,
      },
    });
    res.json(customer);
  } else res.status(405).json({ message: "Method Not Allowed" });
}

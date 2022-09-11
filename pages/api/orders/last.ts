import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function last(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const orders = await prisma.orders.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        name: true,
        description: true,
        deliveryDate: true,
        price: true,
      },
    });

    res.json(orders);
  } else res.status(405).json({ message: "Method Not Allowed" });
}

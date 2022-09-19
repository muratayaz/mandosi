import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function delivery(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const orders = await prisma.orders.findMany({
      orderBy: {
        deliveryDate: "asc",
      },
      take: 10,
      where: {
        deliveryDate: {
          gte: today,
        },
      },
      select: {
        createdAt: true,
        description: true,
        deliveryDate: true,
        price: true,
      },
    });

    res.json(orders);
  } else res.status(405).json({ message: "Method Not Allowed" });
}

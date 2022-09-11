import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function trial(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const orders = await prisma.orders.findMany({
      orderBy: {
        trialDate: "asc",
      },
      take: 10,
      where: {
        trialDate: {
          gte: today,
        },
      },
      select: {
        name: true,
        description: true,
        trialDate: true,
        price: true,
      },
    });
    res.json(orders);
  } else res.status(405).json({ message: "Method Not Allowed" });
}

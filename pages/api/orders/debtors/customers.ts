import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

import { Orders } from "@prisma/client";

export default async function customers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const customers = await prisma.orders.findMany({
      where: {
        paid: {
          gte: 0,
        },
      },
      select: {
        createdAt: true,
        paid: true,
        price: true,
        Customer: {
          select: {
            name: true,
          },
        },
      },
    });

    res.json(customers);
  } else res.status(405).json({ message: "Method Not Allowed" });
}

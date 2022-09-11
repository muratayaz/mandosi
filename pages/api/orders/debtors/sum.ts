import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function sum(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const sum = await prisma.orders.aggregate({
      _sum: {
        paid: true,
      },
    });

    res.json(sum);
  } else res.status(405).json({ message: "Method Not Allowed" });
}

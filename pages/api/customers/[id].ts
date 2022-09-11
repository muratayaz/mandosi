import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method === "GET") {
    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        birthday: true,
        updatedAt: true,
        Detail: true,
        Orders: true,
        image: true,
      },
    });
    res.json(customer);
  } else res.status(405).json({ message: "Method Not Allowed" });
}

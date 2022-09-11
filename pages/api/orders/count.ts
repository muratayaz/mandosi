import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const count = await prisma.orders.count();
    res.json(count);
  } else res.status(405).json({ message: "Method Not Allowed" });
}

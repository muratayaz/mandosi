import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import hashPassword from "../../../utils/hash";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await handlePOST(res, req);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// POST /api/user
async function handlePOST(res, req) {
  const user = await prisma.user.create({
    data: { ...req.body, password: hashPassword(req.body.password) },
  });
  res.json(user);
}

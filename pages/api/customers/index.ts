import { Customer } from "@prisma/client";
import { omit } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import helper from "../../../utils/helper";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await handleGET(res);
      break;
    case "DELETE":
      await handleDELETE(res, req);
      break;
    case "POST":
      await handlePOST(res, req);
      break;
    case "PUT":
      await handlePUT(res, req);
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}
const include = {
  Detail: true,
  Orders: true,
  image: true,
};

async function handleGET(res) {
  const customer = await prisma.customer.findMany({
    include,
  });
  res.json(customer);
}

async function handleDELETE(res, req) {
  await prisma.customer.delete({
    where: {
      id: Number(req.query.id),
    },
  });
  res.status(200).json({ message: "Customer deleted" });
}

async function handlePOST(res, req) {
  req.body.birthday = helper.ISOtimestampsDate(req.body.birthday);
  const detaildData = req.body.detail || {};
  const customerData = omit(req.body, "detail") as Customer;
  const data = {
    ...customerData,
    Detail: {
      create: detaildData ?? {},
    },
  } as Customer;
  if (req.body.imageId) {
    Object.assign(data, {
      image: {
        connect: {
          id: req.body.imageId,
        },
      },
    });
    delete data.imageId;
  }
  const customer = await prisma.customer.create({
    data,
    include,
  });
  res.json(customer);
}

async function handlePUT(res, req) {
  if (req.body.birthday)
    req.body.birthday = helper.ISOtimestampsDate(req.body.birthday);

  const id = Number(req.body.id);
  const detaildData = req.body.detail || {};
  const customerData = omit(req.body, ["id", "detail"]) as Customer;
  const data = {
    ...customerData,
    Detail: {
      update: detaildData ?? {},
    },
  } as Customer;

  if (req.body.imageId) {
    Object.assign(data, {
      image: {
        connect: {
          id: req.body.imageId,
        },
      },
    });
    delete data.imageId;
  } else
    Object.assign(data, {
      image: {
        disconnect: true,
      },
    });

  const customer = await prisma.customer.update({
    where: { id },
    data,
    include,
  });
  res.json(customer);
}

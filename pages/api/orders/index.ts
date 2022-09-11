import { Orders } from "@prisma/client";
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
  Customer: true,
  Detail: true,
  image: true,
};

async function handleGET(res) {
  const orders = await prisma.orders.findMany({
    include,
  });
  res.json(orders);
}

async function handleDELETE(res, req) {
  const { id } = req.query;
  await prisma.orders.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json({ message: "Product deleted" });
}

async function handlePOST(res, req) {
  req.body.deliveryDate = helper.ISOtimestampsDate(req.body.deliveryDate);
  req.body.trialDate = helper.ISOtimestampsDate(req.body.trialDate);

  const customerId = req.body.customerId;
  const detaildData = req.body.detail || {};
  const orderData = omit(req.body, ["customerId", "detail"]) as Orders;
  const data = {
    ...orderData,
    Customer: {
      connect: {
        id: customerId,
      },
    },
    Detail: {
      create: detaildData,
    },
  } as Orders;

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

  const order = await prisma.orders.create({
    data,
    include,
  });
  res.json(order);
}

async function handlePUT(res, req) {
  if (req.body.deliveryDate)
    req.body.deliveryDate = helper.ISOtimestampsDate(req.body.deliveryDate);
  if (req.body.trialDate)
    req.body.trialDate = helper.ISOtimestampsDate(req.body.trialDate);

  const id = Number(req.body.id);
  const customerId = Number(req.body.customerId);
  const detaildData = req.body.detail || {};
  const orderData = omit(req.body, ["id", "customerId", "detail"]) as Orders;
  const data = {
    ...orderData,
    Detail: {
      update: detaildData,
    },
    Customer: {
      connect: {
        id: customerId,
      },
    },
  } as Orders;

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

  const order = await prisma.orders.update({
    where: {
      id,
    },
    data,
    include,
  });
  res.json(order);
}
